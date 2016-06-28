<?php

namespace admin\controller;

use admin\core\Controller;
use lib\JsonResponse;
use lib\Response;

class mAdminController extends Controller {

    public function index() {
        $entity = \file_get_contents(__DIR__."/../Resource/Models.json");
        $_SESSION['entity'] = $entity;
        return $this->View("admin/index.php");
    }

    public function getContentFilterLimitAttrOrderOffset($filter, $limit, $attr, $order, $offset) {
        $db = $this->DB();
        $table = $db->getTable("content");
        if ($filter == -1) {
            $result = $table->paginate($offset, $limit, $order, $attr);
        } else {
            $result = $table->findBy(array("id" => $filter, "content" => $filter,
                "title"=>$filter,"order_list"=>$filter),$attr,$order,$limit,$offset);
        }
        $count = $table->query("select count(*) as c from content");
        if (empty($result)) {
            $data['msg'] = "محتوا;اطلاعاتی یافت نشد;warning;true";
            return $this->JsonResponse($data);
        }
        $ids_category = array();
        foreach ($result as $value) {
            if (!in_array($ids_category, $value['ctg_id'])) {
                $ids_category[] = $value['ctg_id'];
            }
        }
        $data['contentcategory'] = $db->getTable("contentcategory")->findBy(array('id' => $ids_category));
        $data['content'] = $result;
        $data['count'] = $count[0]['c'];
        return new JsonResponse($data);
    }

    public function getAllContentCategory() {
        $result = $this->DB()->getTable("contentcategory")->findAll();
        if (empty($result)) {
            $data['msg'] = "محتوا;اطلاعاتی یافت نشد;warning;true";
            return new JsonResponse($data);
        }
        $data['ctg'] = $result;
        return new JsonResponse($data);
    }

    public function AddContent() {
        $request = $this->Request()->json()->request();
        if (empty($request->get("title")) || empty($request->get("content")) || empty($request->get("ctg_id"))) {
            $data['msg'] = "ثبت اطلاعات محتوا;مشکل در اطلاعات ارسال شده;error;true";
            return new \lib\JsonResponse($data);
        }
        $db = $this->DB()->getTable("content");
        $data = $this->Request()->json()->request()->getAny(array("ctg_id", "content", "title", "order_list"));
        $data['created_at'] = new \DateTime();
        $data['created_at'] = $data['created_at']->format("Y-m-d H:i:s");
        $insert = $db->insert($data);
        if ($insert)
            return new Response("ثبت اطلاعات محتوا;اطلاعات با موفقیت ثبت شد;success;true");
        return new Response("ثبت اطلاعات محتوا;مشکل در ثبت اطلاعات;error;true", 500);
    }

    public function EditContent() {
        $request = $this->Request()->json()->request();
        $db = $this->DB();
        $content = $db->getTable("content")->find($request->get("id"));
        if (!$content) {
            return new Response("ویرایش اطلاعات محتوا;مشکل در اطلاعات ارسال شده;error;true");
        }
        $data = $request->getAny(array("id", "content", "title", "crg_id", "order_list"));
        $data['updated_at'] = new \DateTime();
        $data['updated_at'] = $data['updated_at']->format("Y-m-d H:i:s");
        $update = $db->getTable("content")->update($data);
        if ($update)
            return new Response("ویرایش اطلاعات محتوا;اطلاعات با موفقیت ویرایش شد;success;true");
        return new Response("ویرایش اطلاعات محتوا;مشکل در ویرایش اطلاعات;error;true", 500);
    }

}
