<?php

namespace admin\controller;

use admin\core\Controller;
use lib\JsonResponse;
use lib\Response;

class DefaultController extends Controller {

    public function index() {
        //Get All Data Index
        $entity = \file_get_contents(__DIR__ . "/../Resource/Models.json");
        $_SESSION['entity'] = $entity;
        return $this->View("admin/index.php");
    }
    
    /**
     * This Function return data Entity
     * @param string $entity
     * @param string $filter
     * @param integer $limit
     * @param string $attr
     * @param string $order
     * @param integer $offset
     * @return JsonResponse
     */
    public function getContentFilterLimitAttrOrderOffset($entity, $filter, $limit, $attr, $order, $offset) {
        //read All Entity From Session
        $info_entity = $_SESSION['entity'];
        $info_entity = \json_decode($info_entity);
        $info_entity = get_object_vars($info_entity);
        // Check Entity exists
        if (!isset($info_entity[$entity])) {
            $data['msg'] = " اطلاعات محتوا;مشکل در اطلاعات ارسال شده;error;true";
            return new JsonResponse($data);
        }
        // DB class
        $db = $this->DB();
        // Get Class Table
        $table = $db->getTable($info_entity[$entity]->table);
        //check filters and return query
        if ($filter == -1) {
            $result = $table->paginate($offset, $limit, $order, $attr);
        } else {
            //Get All Fields
            $fields = $info_entity[$entity]->field;
            $search = array();
            // Create a array for search data
            foreach ($fields as $value) {
                if (!in_array($value, $search))
                    $search[$value] = $filter;
            }
            // create query search
            $result = $table->findBy($search, $attr, $order, $limit, $offset);
        }
        //check not empty data
        if (empty($result)) {
            $data['msg'] = "محتوا;اطلاعاتی یافت نشد;warning;true";
            return new JsonResponse($data);
        }
        //Get All Count table
        $count = $table->query("select count(*) from ".$info_entity[$entity]->table);
        //Check Relation table
        if (isset($info_entity[$entity]->info->rel)) {
            $ids_category = array();
            //Get Id Table Relation
            foreach ($result as $value) {
                if (!in_array($ids_category, $value[$info_entity[$entity]->info->field])) {
                    $ids_category[] =$value[$info_entity[$entity]->info->field];
                }
            }
            //Get All Id exists in this table
            $data[$info_entity[$entity]->info->rel] = $db->getTable($info_entity[$entity]->info->rel)->findBy(array('id' => $ids_category));
        }
        
        $data[$info_entity[$entity]->info->main] = $result;
        $data['count'] = $count[0]['count(*)'];
        return new JsonResponse($data);
    }
    
    /**
     * get all category relation
     * @param string $category
     * @return JsonResponse
     */
    public function getAllCategory($category) {
        $result = $this->DB()->getTable($category)->findAll();
        if (empty($result)) {
            $data['msg'] = "محتوا;اطلاعاتی یافت نشد;warning;true";
            return new JsonResponse($data);
        }
        $data['ctg'] = $result;
        return new JsonResponse($data);
    }
    
    /**
     * Add A row in table
     * @param string $entity
     * @return Response
     */
    public function Add($entity) {
        //Read Data Send With Ajax
        $request = $this->Request()->json()->request();
        //Get All Entity
        $info_entity = $_SESSION['entity'];
        $info_entity = \json_decode($info_entity);
        $info_entity = get_object_vars($info_entity);
        //Check Entity Exists
        if (!isset($info_entity[$entity])) {
            return new Response("ثبت اطلاعات ;مشکل در اطلاعات ارسال شده;error;true");
        }
        //Check Fields Required is Fill 
        foreach (get_object_vars($info_entity[$entity]->form) as $value) {
            $val = get_object_vars($value);
            if (isset($val['required'])) {
                if ($val['required'] == true) {
                    if (empty($request->get($val['name']))) {
                        return new Response("ثبت اطلاعات ;فیلد " . $val['label'] . " نمی تواند خال باشد;error;true");
                    }
                }
            }
        }
        //Get Class Table
        $db = $this->DB()->getTable($info_entity[$entity]->table);
        // Get Request Data
        $data = $this->Request()->json()->request()->getAny($info_entity[$entity]->add);
        $data['created_at'] = new \DateTime();
        $data['created_at'] = $data['created_at']->format("Y-m-d H:i:s");
        
        //Insert Data in Table
        $insert = $db->insert($data);
        if ($insert)
            return new Response("ثبت اطلاعات ;اطلاعات با موفقیت ثبت شد;success;true");
        return new Response("ثبت اطلاعات ;مشکل در ثبت اطلاعات;error;true", 500);
    }
    
    /**
     * This Function Edit Row on table
     * @param string $entity
     * @return Response
     */
    public function Edit($entity) {
        //Get Send Data
        $request = $this->Request()->json()->request();
        $info_entity = $_SESSION['entity'];
        $info_entity = \json_decode($info_entity);
        $info_entity = get_object_vars($info_entity);
        //Check Entity Exists
        if (!isset($info_entity[$entity])) {
            return new Response("ویرایش اطلاعات ;مشکل در اطلاعات ارسال شده;error;true");
        }
        //Get Field Send 
        foreach (get_object_vars($info_entity[$entity]->form) as $value) {
            //Get All Field
            $val = get_object_vars($value);
            if (isset($val['required'])) {
                //Check Field Required
                if ($val['required'] == true) {
                    if (empty($request->get($val['name']))) {
                        return new Response("ویرایش اطلاعات ;فیلد " . $val['label'] . "نمی تواند خال باشد;error;true");
                    }
                }
            }
        }
        //Get Db And Find Row
        $db = $this->DB();
        $content = $db->getTable($info_entity[$entity]->table)->find($request->get("id"));
        if (!$content) {
            return new Response("ویرایش اطلاعات ;مشکل در اطلاعات ارسال شده;error;true");
        }
        //Get Request Send Data
        $data = $request->getAny($info_entity[$entity]->edit);
        $data['updated_at'] = new \DateTime();
        $data['updated_at'] = $data['updated_at']->format("Y-m-d H:i:s");
        //Update All Data
        $update = $db->getTable($info_entity[$entity]->table)->update($data);
        if ($update)
            return new Response("ویرایش اطلاعات ;اطلاعات با موفقیت ویرایش شد;success;true");
        return new Response("ویرایش اطلاعات ;مشکل در ویرایش اطلاعات;error;true", 500);
    }
    
    /**
     * This Function For Remove Data
     * @param string $entity
     * @param integer $id
     * @return Response
     */
    public function Remove($entity, $id) {
        //Check Id Is Oks
        if (empty($id) || filter_var($id, FILTER_VALIDATE_INT) == false) {
            return new Response("حذف اطلاعات ;مشکل در اطلاعات ارسال شده;error;true");
        }
        $info_entity = $_SESSION['entity'];
        $info_entity = \json_decode($info_entity);
        $info_entity = get_object_vars($info_entity);
        //Check Entity Exists
        if (!isset($info_entity[$entity])) {
            return new Response("ثبت اطلاعات ;مشکل در اطلاعات ارسال شده;error;true");
        }
        //Get DB And Delete Data
        $table = $this->DB()->getTable($info_entity[$entity]->table);
        $remove = $table->remove($id);
        if ($remove)
            return new Response("حذف اطلاعات ;اطلاعات با موفقیت حذف شد;success;true");
        return new Response("حذف اطلاعات ;مشکل در حذف اطلاعات;error;true", 500);
    }

}
