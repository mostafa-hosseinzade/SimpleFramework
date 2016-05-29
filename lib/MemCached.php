<?php

namespace lib;

/**
 * This Class For Work with memcached
 *
 * @author Mr.Mostafa Hosseinzade
 */
class MemCached {

    public $MemCached;

    public function __construct($class = null) {
        $server = SERVER_MEMCACHED;
        $this->MemCached = ($class == null ? new \Memcached() : new \Memcached($class));
        $this->MemCached->setOption(\Memcached::OPT_CONNECT_TIMEOUT, 10);
        $this->MemCached->setOption(\Memcached::OPT_DISTRIBUTION, \Memcached::DISTRIBUTION_CONSISTENT);
        $this->MemCached->setOption(\Memcached::OPT_SERVER_FAILURE_LIMIT, 2);
        $this->MemCached->setOption(\Memcached::OPT_REMOVE_FAILED_SERVERS, true);
        $this->MemCached->setOption(\Memcached::OPT_RETRY_TIMEOUT, 1);
        $this->MemCached->addServer($server, 11211);
    }

    public function addServers(array $server) {
        foreach ($server as $value) {
            $this->MemCached->addServer($value);
        }
    }

    public function set($key, $value) {
        $this->MemCached->set($key, $value);
    }

    public function get($key) {
        return $this->MemCached->get($key);
    }

    public function quit() {
        $this->MemCached->quit();
    }

    public function append($key, $value) {
        $this->MemCached->append($key, $value);
    }

    public function add($key, $value) {
        $this->MemCached->add($key, $value);
    }

    public function decrement($key) {
        $this->MemCached->decrement($key);
    }

    public function increment($key) {
        $this->MemCached->increment($key);
    }

    public function delete($key, $time = null) {
        $time = ($time == null ? 0 : $time);
        $this->MemCached->delete($key, $time);
    }

    public function deleteMulti($keys, $time = null) {
        $time = ($time == null ? 0 : $time);
        $this->MemCached->deleteMulti($keys, $time);
    }
    
    public function getDelayed(array $keys,$with_cas = true) {
        return $this->MemCached->getDelayed($keys,$with_cas);
    }
    
    public function fetch() {
        return $this->MemCached->fetch();
    }
    
    public function fetchAll() {
        return $this->MemCached->fetchAll();
    }
    
    public function flush($time = 0) {
        $time = ($time == 0 ? 0 : $time);
        $this->MemCached->flush($time);
    }
    
    /**
     * get all keys in cached
     * @return array
     */
    public function getAllKeys() {
        return $this->MemCached->getAllKeys();
    }
    
    public function setMulti(array $item) {
        $this->MemCached->setMulti($item);
    }
    
    public function getMulti(array $keys) {
        return $this->MemCached->getMulti($keys);
    }
    
    public function replace($key , $value) {
        $this->MemCached->replace($key, $value);
    }
}
