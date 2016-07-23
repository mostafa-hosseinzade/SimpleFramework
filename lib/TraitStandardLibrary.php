<?php

trait StandardLibrary {

    /**
     * read all directory and file
     * @param String $path
     */
    public function ReadDirectory($path) {
        $dir = new DirectoryIterator($path);
        return $dir;
    }

    /**
     * read all file in directory
     * @param String $path
     * @return \FilesystemIterator
     */
    public function ReadFiles($path) {
        $dir = new FilesystemIterator($path);
        return $dir;
    }

    /**
     * return data folder data
     * @param String $path
     * @param int $dept
     */
    public function ReadAllFolderFile($path, $dept = null) {
        $dir = new RecursiveDirectoryIterator($path);
        $dir->setFlags(FilesystemIterator::SKIP_DOTS | FilesystemIterator::UNIX_PATHS);
        $dir = new RecursiveIteratorIterator($dir);
        if ($dept != null && filter_var($dept, FILTER_VALIDATE_INT) != false) {
            $dir->setMaxDepth($dept);
        }
        return $dir;
    }

    /**
     * read txt files
     * @param String $path
     * @return array
     */
    public function ReadTxtFilesToLine($path) {
        $dir = new FilesystemIterator($path);
        $files = array();
        foreach ($dir as $file) {
            if ($file->getExtension() == "txt") {
                $text = $file->openFile();
                foreach ($text as $line) {
                    $files[$file->getFilename()][] = $line;
                }
            }
        }
        return $files;
    }

    /**
     * read csv file
     * @param String $path
     * @return string|\SplFileObject
     */
    public function ReadCsvFile($path) {
        if (!file_exists($path)) {
            return "File Not Exists";
        }
        $file = new SplFileObject($path);
        $file->setFlags(SplFileObject::READ_CSV);
        $data = array();
        foreach ($file as $csv) {
            $data[] = $csv;
        }
        return $data;
    }

    /**
     * write csv file to output
     * @param type $data
     * @return Csv File To OutPut
     */
    public function OutOutCsv($data) {
        if (empty($data)) {
            return "File Can not be null";
        }
        if (!is_array($data)) {
            return "File Type Not True";
        }
        $files = new \SplTempFileObject();
        foreach ($data as $value) {
            $files->fputcsv($value);
        }
        $files->rewind();
        header("Content-Type:text/csv");
        header("Content-Disposition:attachment;filename=File.csv");
        $files->fpassthru();
        exit();
    }

    /**
     * Read Data With Directory And Regex
     * @param String $path
     * @param String $regex
     * @return \RegexIterator
     */
    public function SearchInDirectory($path, $regex) {
        $files = new RecursiveDirectoryIterator($path);
        $files = new RecursiveIteratorIterator($files);
        $files = new RegexIterator($files, $regex);
        return $files;
    }

    /**
     * 
     * @param String $path
     * @param String $field
     * @param String $regex
     * @return array
     */
    public function SearchInXml($path,$field ,$regex) {
        if(empty($path) || empty($field) || empty($regex)){
            return "Data Input Can Not Be Null";
        }
        $xml = simplexml_load_file($path, 'SimpleXMLIterator');
        $matches = array();
        foreach ($xml as $value) {
            $search = new RegexIterator($value->{$field}, $regex);
            foreach ($search as $val) {
                $matches[] = $value;
            }
        }
        return $matches;
    }

}
