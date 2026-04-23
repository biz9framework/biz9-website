/*
Copyright 2016 Certified CoderZ
Author: Brandon Poole Sr. (biz9framework@gmail.com)
License GNU General Public License v3.0
Description: BiZ9 Framework: Website
*/
const {Data_Logic,Data_Value_Type,Data_Field} = require("biz9-data-logic");
const {Log,Str,Obj,Num}=require("biz9-utility");
class Website_Logic {
    static get_filter_or_querys = (field,value_field,items) => {
        let query = {$or:[]};
        for(const item of items){
            let query_field = {};
            query_field[field] = item[value_field].value;
            query.$or.push(query_field);
        }
        return query;
    }
    static get_foreign_sub_values = (option) => {
        option = !Obj.check_is_empty(option)  ? option : {};
        option = Obj.merge(option,{title:'sub_values'});
        return Data_Logic.get_foreign(Data_Value_Type.ITEMS,Website_Table.SUB_VALUE,Form_Field.PARENT_ID,Form_Field.ID,option);
    };
    static get_foreign_image_gallery_images = (images_value_type,image_gallery_title_url,option) => {
        image_gallery_title_url = Str.get_title_url(image_gallery_title_url);
        let option_foreign_image_gallery_images = Data_Logic.get_foreign(images_value_type,Website_Table.IMAGE,Form_Field.PARENT_ID,Form_Field.ID,{title:'images'});
        return Data_Logic.get_foreign(Data_Value_Type.ONE,Website_Table.IMAGE_GALLERY,Form_Field.PARENT_ID,Form_Field.ID,{title:image_gallery_title_url+"_image_gallery",foreigns:[ option_foreign_image_gallery_images]});
    };
    static get_test_item = (table,option) =>{
        table = !Obj.check_is_empty(table) ? table : Website_Table.BLANK;
        option = !Obj.check_is_empty(option) ? option : {title:'Item ' + Num.get_id()};
        let data = Data_Logic.get(table,0,option);
        if(option.generate){
            data.id = Num.get_id();
            data.parent_id = Num.get_id();
            data.parent = Website_Table.BLANK;
        }
        data.category = "Category "+String(Num.get_id());
        data.type = "Type "+String(Num.get_id());
        data.note = "Note "+String(Num.get_id());
        return data;
    };
    static get_test_items = (table,count,option) =>{
        table = !Obj.check_is_empty(table) ? table : Website_Table.BLANK;
        option = !Obj.check_is_empty(option) ? option : {};
        if(!count){
            count = 9;
        }
        let items = [];
        for(let a = 0; a < count; a++){
            items.push(Website_Logic.get_test_item(table,option));
        }
        return items;
    };
}
class Website_Url {
    //page
    static ABOUT="page/about";
    static BLOG_POST="page/blog_post";
    static BLOG_POST_HOME="page/blog_post_home";
    static BLOG_POST_SEARCH="page/blog_post_search";
    static CONTACT="page/contact";
    static EVENT="page/event";
    static EVENT_HOME="page/event_home";
    static EVENT_SEARCH="page/event_search";
    static FAQ="page/faq";
    static GALLERY="page/gallery";
    static GALLERY_HOME="page/gallery_home";
    static GALLERY_SEARCH="page/gallery_search";
    static HOME="index";
    static LOGIN="page/login";
    static PAGE_PING_GET="page/ping_get";
    static PAGE_PING_POST="page/ping_post";
    static PRODUCT="page/product";
    static PRODUCT_HOME="page/product_home";
    static PRODUCT_SEARCH="page/product_search";
    static REGISTER="user/register";
    static SERVICE="page/service";
    static SERVICE_HOME="page/service_home";
    static SERVICE_SEARCH="page/service_search";
    static REVIEW_HOME="page/review_home";
}
class Website_Stat {
    static ITEM_GET="item_get";
    static ITEM_POST="item_post";
}
class Website_Table {
    static BLANK="blank_biz";
    static CATEGORY="category_biz";
    static IMAGE="image_biz";
    static IMAGE_GALLERY="image_gallery_biz";
    static FILE="file_biz";
    static PAGE="page_biz";
    static TEMPLATE="template_biz";
    static SUB_VALUE='sub_value_biz';
    static SUB_VALUE_ITEMS='sub_value_item_biz';
    static STAT='stat_biz';
    static VIDEO="video_biz";
    static VIDEO_GALLERY="video_gallery_biz";
}
class Website_Title {
    static IMAGES='Images';
    //page_section
    static PAGE_SECTION_HEADER='Header Section';
    static PAGE_SECTION_BODY='Body Section';
    static PAGE_SECTION_FOOTER='Footer Section';
    //page
    static PAGE_ABOUT='About';
    static PAGE_CONTACT='Contact';
    static PAGE_HOME='Home';
    static PAGE_FAQ='Faq';
    static PAGE_BLOG_POST='Blog Post';
    static PAGE_BLOG_POST_HOME='Blog Post Home';
    static PAGE_BLOG_POST_SEARCH='Blog Post Search';
    static PAGE_EVENT='Event';
    static PAGE_EVENT_HOME='Event Home';
    static PAGE_EVENT_SEARCH='Event Search';
    static PAGE_GALLERY='Gallery';
    static PAGE_GALLERY_HOME='Gallery Home';
    static PAGE_GALLERY_SEARCH='Gallery Search';
    static PAGE_LOGIN='Login';
    static PAGE_PRODUCT='Product';
    static PAGE_PRODUCT_HOME='Product Home';
    static PAGE_PRODUCT_SEARCH='Product Search';
    static PAGE_REGISTER='Register';
    static PAGE_REVIEW_HOME='Review Home';
    static PAGE_SERVICE='Service';
    static PAGE_SERVICE_HOME='Service Home';
    static PAGE_SERVICE_SEARCH='Service Search';
    //template
    static TEMPLATE_SECTION_HEADER='Header Section';
    static TEMPLATE_SECTION_BODY='Body Section';
    static TEMPLATE_SECTION_FOOTER='Footer Section';
    //enviroments
    static ENVIRONMENT_TEST='Test';
    static ENVIRONMENT_STAGE='Stage';
    static ENVIRONMENT_PRODUCTION='Production';
}
class Form_Field {
    static CATEGORY="category";
    static DATE_CREATE='date_create';
    static DATE_SAVE='date_save';
    static DESCRIPTION='description';
    static EMAIL='email';
    static FIELD='field';
    static GROUP='group';
    static GROUP_ID='group_id';
    static HEADER='header';
    static FOOTER='footer';
    static IMAGE="image";
    static IMAGES = 'images';
    static ID = 'id';
    static ITEMS="items";
    static IMAGE_FILENAME = 'image_filename';
    static MESSAGE="message";
    static NOTE="note";
    static TABLE="table";
    static TAG="tag";
    static TITLE="title";
    static TITLE_URL="title_url";
    static TEMP_ID="temp_id";
    static TEXT="text";
    static TYPE="type";
    static USER='user';
    static USER_ID = 'user_id';
    static USERNAME = 'username';
    static URL="url";
    static PARENT_ID = 'parent_id';
    static PARENT_TABLE='parent_table';
    static USER_TABLE='user_table';
    static SOURCE='source';
    static SOURCE_ID='source_id';
    static SOURCE_TABLE='source_table';
    static TAGS="tags";
    static TYPE="type";
    static TITLE = 'title';
    static TITLE_URL = 'title_url';
    static VALUE = 'value';
    static WEBSITE = 'website';
}
class Website_Type {
    static TEMPLATE_PRIMARY = 'primary';
    //result
    static RESULT_OK_IMAGE_DELETE = 'image_delete_resultOK';
    static RESULT_OK_IMAGE_DELETE = 'image_delete_resultOK';
    //sub_value
    static SUB_VALUE_TEXT = 'text';
    static SUB_VALUE_NOTE = 'note';
    static SUB_VALUE_IMAGE = 'image';
    static SUB_VALUE_ITEMS = 'items';
}
class Template_Logic {
    static get_template_sub_value_edit = (template_id,section_type) => {
        return {parent_table:Website_Table.TEMPLATE,parent_id:template_id,section_type:section_type,event_handler:section_type + "_"+Form_Field.MESSAGE};
    };
      static get_template_section = (type) => {
        let template_section_list = [
            {value:Str.get_title_url(Website_Title.TEMPLATE_SECTION_HEADER),title:Website_Title.TEMPLATE_SECTION_HEADER,label:Website_Title.TEMPLATE_SECTION_HEADER},
            {value:Str.get_title_url(Website_Title.TEMPLATE_SECTION_BODY),title:Website_Title.TEMPLATE_SECTION_BODY,label:Website_Title.TEMPLATE_SECTION_BODY},
            {value:Str.get_title_url(Website_Title.TEMPLATE_SECTION_FOOTER),title:Website_Title.TEMPLATE_SECTION_FOOTER,label:Website_Title.TEMPLATE_SECTION_FOOTER},
        ];
        return template_section_list.find(item_find => item_find.value === type)? template_section_list.find(item_find => item_find.value === type) : {value:Website_Title.TEMPLATE_SECTION_BODY,title:Website_Title.TEMPLATE_SECTION_BODY,label:Website_Title.TEMPLATE_SECTION_BODY};
    };

}
class Sub_Value_Logic {
  static get_sub_value = (parent_table,parent_id,type,title) => {
        return Data_Logic.get(Website_Table.SUB_VALUE,0,{data:{parent_table:parent_table,parent_id:parent_id,type:type,title:title}});
    };
 static get_sub_value_value(item_sub_value_edit,sub_values,sub_value_type,section_id){
        let value_title = '';
        if(!sub_values){
            sub_values=[];
        }
        if(item_sub_value_edit[Form_Field.PARENT_TABLE] === Website_Table.PAGE){
            value_title = Page_Logic.get_page_section(item_sub_value_edit.section_type).title+ " "+section_id;
        }else if(item_sub_value_edit[Form_Field.PARENT_TABLE] === Website_Table.TEMPLATE){
            value_title = Template_Logic.get_template_section(item_sub_value_edit.section_type).title+ " "+section_id;
        }
        if(sub_value_type != Form_Field.ITEMS){
            if(sub_values.length>0){
                return  sub_values.find(item_find => item_find.title === value_title) ? sub_values.find(item_find => item_find.title === value_title).value : "";
            }else{
                return "";
            }
        }else{
            let values = [];
            let value_title = '';
            if(!sub_values){
                sub_values=[];
            }
            if(item_sub_value_edit[Form_Field.PARENT_TABLE] === Website_Table.PAGE){
                value_title = Page_Logic.get_page_section(item_sub_value_edit.section_type).title+ " "+section_id;
            }else if(item_sub_value_edit[Form_Field.PARENT_TABLE] === Website_Table.TEMPLATE){
                value_title = Template_Logic.get_template_section(item_sub_value_edit.section_type).title+ " "+section_id;
            }
            let sub_value_match =  sub_values.find(item_find => item_find[Form_Field.TITLE] === value_title);
            if(sub_value_match){
                let groups = [];
                for(let a = 0; a < 30; a++){
                    if(typeof sub_value_match[Form_Field.GROUP+"_"+a] !== "undefined"){
                        let new_group = {group_id:0};
                        new_group[Form_Field.GROUP_ID] = sub_value_match[Form_Field.GROUP+"_"+a];
                        groups.push(new_group);
                    }
                }
                for(const group of groups){
                    let value = {};
                    for(const field in sub_value_match){
                        if(field.startsWith(Form_Field.FIELD + "_" + group.group_id + "_")){
                            value[sub_value_match[field]] = sub_value_match[field.replace(Form_Field.FIELD,Form_Field.VALUE)];
                        }
                    }
                    if(value){
                        values.push(value);
                    }
                }
            }
            return values;
        }
    }
}
class Page_Logic {
    static get_test = () =>{
        let data = Data_Logic.get(Website_Table.PAGE,0);
        data.title="Title "+ Num.get_id();
        data.value="Value "+ Num.get_id();
        return data;
    };
    static get_page_sub_value_edit = (page_id,section_type) => {
        return {parent_table:Website_Table.PAGE,parent_id:page_id,section_type:section_type,event_handler:Str.get_title_url(section_type+ "_"+Form_Field.MESSAGE)};
    };
    static get_pages = () =>{
        let pages = [
            {value:Str.get_title_url(Website_Title.PAGE_ABOUT),url:Website_Url.PAGE_ABOUT,title:Str.get_title(Website_Title.PAGE_ABOUT)},
            {value:Str.get_title_url(Website_Title.PAGE_BLOG_POST),url:Website_Url.PAGE_BLOG_POST,title:Str.get_title(Website_Title.PAGE_BLOG_POST)},
            {value:Str.get_title_url(Website_Title.PAGE_CONTACT),url:Website_Url.PAGE_CONTACT,title:Str.get_title(Website_Title.PAGE_CONTACT)},
            {value:Str.get_title_url(Website_Title.PAGE_EVENT),url:Website_Url.PAGE_EVENT,title:Str.get_title(Website_Title.PAGE_EVENT)},
            {value:Str.get_title_url(Website_Title.PAGE_FAQ),url:Website_Url.PAGE_FAQ,title:Str.get_title(Website_Title.PAGE_FAQ)},
            {value:Str.get_title_url(Website_Title.PAGE_HOME),url:Website_Url.PAGE_HOME,title:Str.get_title(Website_Title.PAGE_HOME)},
            {value:Str.get_title_url(Website_Title.PAGE_FAQ),url:Website_Url.PAGE_FAQ,title:Str.get_title(Website_Title.PAGE_FAQ)},
            {value:Str.get_title_url(Website_Title.PAGE_GALLERY),url:Website_Url.PAGE_GALLERY,title:Str.get_title(Website_Title.PAGE_GALLERY)},
            {value:Str.get_title_url(Website_Title.PAGE_PRODUCT),url:Website_Url.PAGE_PRODUCT,title:Str.get_title(Website_Title.PAGE_PRODUCT)},
            {value:Str.get_title_url(Website_Title.PAGE_REGISTER),url:Website_Url.PAGE_REGISTER,title:Str.get_title(Website_Title.PAGE_REGISTER)},
            {value:Str.get_title_url(Website_Title.PAGE_SERVICE),url:Website_Url.PAGE_SERVICE,title:Str.get_title(Website_Title.PAGE_SERVICE)}
        ];
        let r_pages = [];
        for(const page of pages){
            let r_page = {};
            r_page.label = page.title;
            r_page.title = page.title;
            r_page.value = page.type;
            r_page.url = page.url;
            r_pages.push(r_page);
        };
        return r_pages;
    };
     static get_page_section = (type) => {
        let page_section_list = [
            {value:Str.get_title_url(Website_Title.PAGE_SECTION_HEADER),title:Website_Title.PAGE_SECTION_HEADER,label:Website_Title.PAGE_SECTION_HEADER},
            {value:Str.get_title_url(Website_Title.PAGE_SECTION_BODY),title:Website_Title.PAGE_SECTION_BODY,label:Website_Title.PAGE_SECTION_BODY},
            {value:Str.get_title_url(Website_Title.PAGE_SECTION_FOOTER),title:Website_Title.PAGE_SECTION_FOOTER,label:Website_Title.PAGE_SECTION_FOOTER}
        ];
        return page_section_list.find(item_find => item_find.value === type)? page_section_list.find(item_find => item_find.value === type) : {value:Website_Title.PAGE_SECTION_BODY,title:Website_Title.PAGE_SECTION_BODY,label:Str.get_title_url(Website_Title.PAGE_SECTION_BODY)};
    };

}
module.exports = {
    Sub_Value_Logic,
    Form_Field,
    Page_Logic,
    Website_Logic,
    Website_Table,
    Website_Title,
    Website_Type,
    Website_Stat,
    Template_Logic,
    Website_Url
};
