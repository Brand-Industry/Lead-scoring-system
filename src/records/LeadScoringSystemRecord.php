<?php

namespace brandindustry\leadscoringsystem\records;

use craft\db\ActiveRecord;

class LeadScoringSystemRecord extends ActiveRecord
{
  public static function tableName(): string
  {
    return '{{%leadscoringsystem}}';
  }
}
