<?php

namespace brandindustry\leadscoringsystem\services;

use brandindustry\leadscoringsystem\helpers\FieldsValidationsHelper;
use brandindustry\leadscoringsystem\helpers\GetDataHelper;

class SubmissionService
{
  private $getDataHelper;
  private $fieldsValidationsHelper;

  public function __construct(GetDataHelper $getDataHelper, FieldsValidationsHelper $fieldsValidationsHelper)
  {
    $this->getDataHelper = $getDataHelper;
    $this->fieldsValidationsHelper = $fieldsValidationsHelper;
  }

  public function getData($query)
  {
    return $this->getDataHelper->getData($query);
  }

  public function fieldsValidations($data, $conditionArray)
  {
    return $this->fieldsValidationsHelper->fieldsValidations($data, $conditionArray);
  }
}
