<?php

namespace brandindustry\leadscoringsystem\variables;

use brandindustry\leadscoringsystem\LeadScoringSystem;

class LeadScoringSystemVariable
{
    public function getPluginName()
    {
        return LeadScoringSystem::$plugin->getPluginName();
    }
}
