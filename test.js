/*
Copyright 2016 Certified CoderZ
Author: Brandon Poole Sr. (biz9framework@gmail.com)
License GNU General Public License v3.0
Description: BiZ9 Framework: Website - Test
*/
const async = require('async');
const assert = require('node:assert');
const {Log,Str} = require("biz9-utility");
const {Data_Logic,Data_Value_Type}=require("biz9-data-logic");

const {
    Form_Field,
    File_Logic,
    Image_Logic,
    Page_Logic,
    Template_Logic,
    Field_Logic,
    Storage_Logic,
    Website_Logic,
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

class Project_Table {
    static BLANK='blank_biz';
    static PRODUCT='product_biz';
    static TYPE='type_biz';
    static CUSTOM_FIELD='custom_field_biz';
    static CATEGORY='category_biz';
    static IMAGE_GALLERY='image_gallery_biz';
    static IMAGE='image_biz';
}

/* --- DATA CONFIG END --- */
//9_connect - 9_test_connect
describe('connect', function(){ this.timeout(25000);
    it("_connect", function(done){
        let error=null;
        let database = {};
        let data = {};
        async.series([
            async function(call){
                console.log('CONNECT-START');
                // -- WEBSITE-TEST-ITEM-START -- //

                Log.w('rrr',Page_Logic.get_pages())
                // -- IMAGE-GALLERY-START -- //
                /*
                //let data = Website_Logic.get_image_gallery_foreign(Data_Value_Type.ITEMS);
                let data = Website_Logic.get_image_gallery_image_foreign(Data_Value_Type.ITEMS,1,0);
                Log.w('data',data);
                console.log('CONNECT-IMAGE-GALLERY-SUCESS');
                */
                // -- IMAGE-GALLERY-END -- //
                //-->
                //Log.w('user_foreign',Website_Data.get_user_foreign());
                //Log.w('parent_foreign',Website_Data.get_parent_foreign(Website_Table.BLANK));
                //Log.w('sub_values_foreign',Website_Data.get_sub_values_foreign());
                //Log.w('33_print',Website_Title);
                //Log.w('33_print',Page_Logic.get_page_section(Str.get_title_url(Website_Title.PAGE_SECTION_FOOTER)));
                //Log.w('tttttt',Str.get_title_url(Website_Title.PAGE_SECTION_FOOTER));
                //Log.w('33_print',Field_Logic.get_sub_value(Website_Table.BLANK,1,'cool'));
                //Log.w('33_print',Template_Logic);

                //let biz_data = Image_Logic.get_process_items('uploaddir1','filename1');

            },
        ],
            function(error, result){
                console.log('CONNECT-DONE');
                done();
            });
    });
});

