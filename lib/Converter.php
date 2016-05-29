<?php

namespace lib;

/**
 * This Class Convert Data To Json And Xml
 *
 * @author administrator
 */
class Converter {

    /**
     * This function convert array data to json
     * @param array $data
     * @return json
     */
    public static function json(array $data) {
        if (empty($data))
            return null;
        $output = \json_encode($data);
        return $output;
    }

    /**
     * This function create xml file with array data
     * @param array $array array data for xml
     * @param string $directory for create xml file
     * @param string $name name file
     * @param rootXml $data like <user></user> or <data></data>
     * @return boolean true or false
     */
    public static function xmlAsFile($array, $directory = "", $name, $data = "<data></data>") {
        if (empty($array))
            return false;
        $xml_user_info = new \SimpleXMLElement("<?xml version=\"1.0\"?>" . $data);
        foreach ($array as $key => $value) {
            if (is_array($value)) {
                if (!is_numeric($key)) {
                    $subnode = $xml_user_info->addChild("$key");
                    array_to_xml($value, $subnode);
                } else {
                    $subnode = $xml_user_info->addChild("item$key");
                    array_to_xml($value, $subnode);
                }
            } else {
                $xml_user_info->addChild("$key", htmlspecialchars("$value"));
            }
        }
        if ($xml_user_info->asXML($directory . '/' . $name . ".xml"))
            return true;

        return false;
    }

    /**
     * This function convert to xml and return data
     * @param array $array array data for xml
     * @param rootXml $data like <user></user> or <data></data>
     * @return xml data
     */
    public static function xml($array, $data = "<data></data>") {
        if(empty($array)){
            return false;
        }
        $xml_user_info = new \SimpleXMLElement("<?xml version=\"1.0\"?>" . $data);
        foreach ($array as $key => $value) {
            if (is_array($value)) {
                if (!is_numeric($key)) {
                    $subnode = $xml_user_info->addChild("$key");
                    array_to_xml($value, $subnode);
                } else {
                    $subnode = $xml_user_info->addChild("item$key");
                    array_to_xml($value, $subnode);
                }
            } else {
                $xml_user_info->addChild("$key", htmlspecialchars("$value"));
            }
        }
        return $xml_user_info->asXML();
    }

}
