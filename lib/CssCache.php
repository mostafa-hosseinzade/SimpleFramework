<?php

namespace lib;

class CssCache {

    private $filenames = array();
    private $cwd;

    public function __construct($i_filename_arr) {
        if (!is_array($i_filename_arr))
            $i_filename_arr = array($i_filename_arr);

        $this->filenames = $i_filename_arr;
        $this->cwd = getcwd() . DIRECTORY_SEPARATOR;

        if ($this->style_changed())
            $expire = -72000;
        else
            $expire = 3200;

        header('Content-Type: text/css; charset: UTF-8');
        header('Cache-Control: must-revalidate');
        header('Expires: ' . gmdate('D, d M Y H:i:s', time() + $expire) . ' GMT');
    }

    public function dump_style() {
        ob_start();
        foreach ($this->filenames as $filename) {
            $this->dump_cache_contents($filename);
        }
        ob_end_flush();
    }

    private function get_cache_name($filename, $wildcard = FALSE) {
        if (file_exists($filename)) {
            $stat = \stat($filename);
            return $filename . '.' .
                    ($wildcard ? '*' : ($stat['size'] . '-' . $stat['mtime'])) . '.cache';
        } else {
            return false;
        }
    }

    private function style_changed() {
        foreach ($this->filenames as $filename)
            if (!is_file($this->get_cache_name($filename)))
                return TRUE;
        return FALSE;
    }

    private function compress($buffer) {
        $buffer = preg_replace('!/\*[^*]*\*+([^/][^*]*\*+)*/!', '', $buffer);
        $buffer = str_replace(array("\r\n", "\r", "\n", "\t", '  '), '', $buffer);
        $buffer = str_replace('{ ', '{', $buffer);
        $buffer = str_replace(' }', '}', $buffer);
        $buffer = str_replace('; ', ';', $buffer);
        $buffer = str_replace(', ', ',', $buffer);
        $buffer = str_replace(' {', '{', $buffer);
        $buffer = str_replace('} ', '}', $buffer);
        $buffer = str_replace(': ', ':', $buffer);
        $buffer = str_replace(' ,', ',', $buffer);
        $buffer = str_replace(' ;', ';', $buffer);
        return $buffer;
    }

    private function dump_cache_contents($filename) {
        $current_cache = $this->get_cache_name($filename);

        // the cache exists - just dump it
        if (is_file($current_cache)) {
            include($current_cache);
            return;
        }

        // remove any old, lingering caches for this file
        if ($dead_files = glob($this->get_cache_name($filename, TRUE), GLOB_NOESCAPE))
            foreach ($dead_files as $dead_file)
                unlink($dead_file);

        $compressed = $this->compress(file_get_contents($filename));
        \file_put_contents($current_cache, $compressed);
    }

}
