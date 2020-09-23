<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication;

    public function assertEventIsBroadcasted($eventClassName, $channel=""){
        $logfileFullpath = storage_path("logs/laravel.log");
        $logfile = explode("\n", file_get_contents($logfileFullpath));

        if(count($logfile) > 4){
            $supposedLastEventLogged = $logfile[count($logfile)-5];

            $this->assertContains("Broadcasting [", $supposedLastEventLogged, "No broadcast were found.\n");

            $this->assertContains("Broadcasting [".$eventClassName."]", $supposedLastEventLogged, "A broadcast was found, but not for the classname '".$eventClassName."'.\n");

            if($channel != "")
                $this->assertContains("Broadcasting [".$eventClassName."] on channels [".$channel."]", $supposedLastEventLogged, "The expected broadcast (".$eventClassName.") event was found, but not on the expected channel '".$channel."'.\n");
        }else{
            $this->fail("No informations found in the file log '".$logfileFullpath."'.");
        }
    }
}
