<?php

namespace brandindustry\leadscoringsystem\helpers;

use craft\helpers\UrlHelper;

class GetDataHelper
{
  public function getData($query)
  {
    $Submissions = [];
    foreach ($query as $submission) {
      $fieldsSubmissions = [];
      foreach ($submission as $field) {
        $value = $submission[$field->getHandle()]->getValue();
        if (is_array($value)) {
          $getValue = reset($value);
          $value = !$getValue ? "" : $getValue;
        }
        $fieldsSubmissions[$field->getHandle()] = ["label" => $field->getLabel(), "value" => $value];
      }
      $Submissions["item-" . $submission->getId()] = [
        "title"  => $submission->title,
        "url" => UrlHelper::url("") . "/freeform/submissions/" . $submission->getId(),
        "fields" => $fieldsSubmissions,
        "dateCreate" => $submission->dateCreated
      ];
    }
    return $Submissions;
  }
}
