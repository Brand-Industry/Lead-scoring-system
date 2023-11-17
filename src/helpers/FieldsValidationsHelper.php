<?php

namespace brandindustry\leadscoringsystem\helpers;

class FieldsValidationsHelper
{
  /*public function fieldsValidations($data, $conditionArray)*/
  /*{*/
  /*$arrayElements = [];*/
  /*foreach ($conditionArray as $condicion) {*/
  /*$field = $condicion['field']['handle'];*/
  /*$operator = $condicion['operator'];*/
  /*$value = $condicion['value'];*/
  /*$points = (int)$condicion['points'];*/

  /*foreach ($data as $key => $itemData) {*/
  /*$fields = $itemData["fields"];*/
  /*if (array_key_exists($field, $fields)) {*/
  /*$item = $fields[$field];*/
  /*$itemValue = $item["value"];*/
  /*$isLead = false;*/
  /*switch ($operator) {*/
  /*case "contiene":*/
  /*$isLead = stripos($itemValue, $value) !== false;*/
  /*break;*/
  /*case "contiene-mm":*/
  /*$isLead = strpos($itemValue, $value) !== false;*/
  /*break;*/
  /*case 'no-contiene':*/
  /*$isLead = stripos($itemValue, $value) === false;*/
  /*break;*/
  /*case 'no-contiene-mm':*/
  /*$isLead = strpos($itemValue, $value) === false;*/
  /*break;*/
  /*case 'mayor-que':*/
  /*$isLead = $value > $itemValue;*/
  /*break;*/
  /*case 'menor-que':*/
  /*$isLead = $value < $itemValue;*/
  /*break;*/
  /*case 'es-igual-a':*/
  /*$isLead = $value === $itemValue;*/
  /*break;*/
  /*case 'no-es-igual-a':*/
  /*$isLead = $value !== $itemValue;*/
  /*break;*/
  /*case 'coincide':*/
  /*$isLead = preg_match('/' . $value . '/', $itemValue) === 1;*/
  /*break;*/
  /*case 'no-coincide':*/
  /*$isLead = preg_match('/' . $value . '/', $itemValue) !== 1;*/
  /*break;*/
  /*default:*/
  /*$isLead = false;*/
  /*break;*/
  /*}*/

  /*if ($isLead) {*/
  /*$newDataCreate = [*/
  /*"handle" => $field,*/
  /*"label" => $item["label"],*/
  /*"operator" => $operator,*/
  /*"value" => $value,*/
  /*"valueSubmission" => $itemValue,*/
  /*"points" =>  $points,*/
  /*"isLead" => $isLead,*/
  /*];*/

  /*if (array_key_exists($key, $arrayElements) && $isLead) {*/
  /*$element = $arrayElements[$key];*/
  /*$fields = $element["fields"];*/
  /*array_push($fields, $newDataCreate);*/
  /*$arrayElements[$key]["fields"] = $fields;*/
  /*$arrayElements[$key]["totalPoints"] += (int)$points;*/
  /*} else {*/
  /*$arrayElements[$key] = [*/
  /*"title" => $itemData["title"],*/
  /*"url" => $itemData["url"],*/
  /*"totalPoints" => $points,*/
  /*"fields" => [$newDataCreate],*/
  /*"date" => $itemData["dateCreate"]->format('Y-m-d')*/
  /*];*/
  /*}*/
  /*}*/
  /*}*/
  /*}*/
  /*}*/

  /*return $arrayElements;*/
  /*}*/



  public function fieldsValidations($data, $conditionArray)
  {
    $arrayElements = [];

    foreach ($data as $key => $itemData) {
      $fields = $itemData["fields"];
      $totalPoints = 0;

      foreach ($conditionArray as $condicion) {
        $field = $condicion['field']['handle'];
        $operator = $condicion['operator'];
        $value = $condicion['value'];
        $points = (int)$condicion['points'];

        if (array_key_exists($field, $fields) && $this->evaluateCondition($fields[$field]["value"], $operator, $value)) {
          $totalPoints += $points;
        }
      }

      //if ($totalPoints > 0) {
      $arrayElements[$key] = $this->buildResultArray($itemData, $conditionArray, $totalPoints);
      //}
    }

    return $arrayElements;
  }

  private function evaluateCondition($itemValue, $operator, $value)
  {
    $isLead = false;
    switch ($operator) {
      case "contiene":
        $isLead = stripos($itemValue, $value) !== false;
        break;
      case "contiene-mm":
        $isLead = strpos($itemValue, $value) !== false;
        break;
      case 'no-contiene':
        $isLead = stripos($itemValue, $value) === false;
        break;
      case 'no-contiene-mm':
        $isLead = strpos($itemValue, $value) === false;
        break;
      case 'mayor-que':
        $isLead = $value > $itemValue;
        break;
      case 'menor-que':
        $isLead = $value < $itemValue;
        break;
      case 'es-igual-a':
        $isLead = $value === $itemValue;
        break;
      case 'no-es-igual-a':
        $isLead = $value !== $itemValue;
        break;
      case 'coincide':
        $isLead = preg_match('/' . $value . '/', $itemValue) === 1;
        break;
      case 'no-coincide':
        $isLead = preg_match('/' . $value . '/', $itemValue) !== 1;
        break;
      default:
        $isLead = false;
        break;
    }
    return $isLead;
  }
  private function buildResultArray($itemData, $conditionArray, $totalPoints)
  {
    $resultArray = [
      "title" => $itemData["title"],
      "url" => $itemData["url"],
      "totalPoints" => $totalPoints,
      "fields" => [],
      "date" => isset($itemData["dateCreate"]) ? $itemData["dateCreate"]->format('Y-m-d') : null,
    ];

    foreach ($conditionArray as $condicion) {
      $field = $condicion['field']['handle'];
      $operator = $condicion['operator'];
      $value = $condicion['value'];
      $points = (int)$condicion['points'];

      if (array_key_exists($field, $itemData["fields"])) {
        $item = $itemData["fields"][$field];
        $fieldValue = $item["value"];

        if ($this->evaluateCondition($fieldValue, $operator, $value)) {
          $resultArray["fields"][] = [
            "handle" => $field,
            "label" => $item["label"],
            "operator" => $operator,
            "value" => $value,
            "valueSubmission" => $fieldValue,
            "points" => $points,
            "isLead" => true,
          ];
        }
      }
    }

    return $resultArray;
  }
}
