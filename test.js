/*
Copyright 2016 Certified CoderZ
Author: Brandon Poole Sr. (biz9framework@gmail.com)
License GNU General Public License v3.0
Description: BiZ9 Framework: Website - Test
*/
const async = require('async');
const assert = require('node:assert');
const {Log,Str} = require("biz9-utility");
const {Form_Field,
    File_Logic,
    Image_Logic,
    Page_Logic,
    Template_Logic,
    Storage_Logic,
    Website_Table,
    Website_Title,
    Website_Type,
    Website_Url
} = require("./index");
/*
 * availble tests
- connect
*/
/* --- TEST CONFIG START --- */
const APP_ID = 'test-stage-feb17';
/* --- TEST CONFIG END --- */

/* --- DATA CONFIG END --- */
//9_connect - 9_test_connect
describe('connect', function(){ this.timeout(25000);
    it("_connect", function(done){
        let error=null;
        let database = {};
        let data = {};
        async.series([
            async function(call){
                //-->
                let print_test = false;
                //Log.w('33_print',Website_Title);
                //Log.w('33_print',Page_Logic.get_page_section(Str.get_title_url(Website_Title.PAGE_SECTION_FOOTER)));
                //Log.w('tttttt',Str.get_title_url(Website_Title.PAGE_SECTION_FOOTER));
                Log.w('33_print',Page_Logic.get_pages());
                //Log.w('33_print',Template_Logic);

                //let biz_data = Image_Logic.get_process_items('uploaddir1','filename1');

                if(print_test){;
                    Log.w('99_biz_data',biz_data);
                }
            },
        ],
            function(error, result){
                console.log('CONNECT-DONE');
                done();
            });
    });
});

