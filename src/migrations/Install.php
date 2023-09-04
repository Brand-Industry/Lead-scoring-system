<?php

namespace brandindustry\leadscoringsystem\migrations;

use brandindustry\leadscoringsystem\records\LeadScoringSystemRecord;
use Craft;
use craft\db\Migration;

class Install extends Migration
{

  private $nameTable;

  public function __construct(array $config = [])
  {
    $this->nameTable = LeadScoringSystemRecord::tableName();
    parent::__construct($config);
  }

  public function safeUp(): bool
  {
    $this->createTables();
    $this->createIndexs();
    Craft::$app->db->schema->refresh();
    return true;
  }

  public function safeDown(): bool
  {
    $this->dropTableIfExists($this->nameTable);
    return true;
  }

  private function createTables()
  {
    $this->createTable($this->nameTable, [
      'id' => $this->primaryKey(),
      'uid' => $this->uid(),
      'dateCreated' => $this->dateTime()->notNull(),
      'dateUpdated' => $this->dateTime()->notNull(),
      'formHandle' => $this->string()->notNull(),
      'formData' => $this->json()->notNull(),
      'filterDate' => $this->json(),
    ]);
  }
  private function createIndexs()
  {
    $this->createIndex(null, $this->nameTable, 'uid', true);
  }
}
