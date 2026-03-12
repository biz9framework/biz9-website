/*
Copyright 2016 Certified CoderZ
Author: Brandon Poole Sr. (biz9framework@gmail.com)
License GNU General Public License v3.0
Description: BiZ9 Framework: Website
*/
const {Data_Logic}=require("biz9-data-logic");
const {Log,Str,Obj,Num}=require("biz9-utility");
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
class Website_Table {
    static BLANK="blank_biz";
    static CATEGORY="category_biz";
    static IMAGE="image_biz";
    static FILE="file_biz";
    static PAGE="page_biz";
    static TEMPLATE="template_biz";
    static SUB_VALUE='sub_value_biz';
    static SUB_VALUE_ITEMS='sub_value_item_biz';
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
}
class Form_Field {
    static CATEGORY="category";
    static DATE_CREATE='date_create';
    static DATE_SAVE='date_save';
    static DESCRIPTION='description';
    static FIELD='field';
    static GROUP='group';
    static GROUP_ID='group_id';
    static IMAGE="image";
    static IMAGES = 'images';
    static ID = 'id';
    static ITEMS="items";
    static IMAGE_FILENAME = 'image_filename';
    static MESSAGE="message";
    static NOTE="note";
    static TITLE="title";
    static TITLE_URL="title_url";
    static TEMP_ID="temp_id";
    static TEXT="text";
    static TYPE="type";
    static USER='user';
    static USER_ID = 'user_id';
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
class Storage_Logic {
    static get = (window,key) => {
        if(!Obj.check_is_empty(window)){
            if(Str.check_is_null(window.localStorage.getItem(key))){
                return null;
            }else{
                return JSON.parse(window.localStorage.getItem(key));
            }
        }else{
            return null;
        }
    }
    static post = (window,key,obj) => {
        if(!Obj.check_is_empty(window)){
            if(window.localStorage){
                window.localStorage.setItem(key,JSON.stringify(obj));
            }
        }
    }
    static delete = (window,key) =>{
        if(!Obj.check_is_empty(window)){
            if(window.localStorage){
                window.localStorage.removeItem(key);
            }
        }
    }
    static delete_all = (window) =>{
        if(!Obj.check_is_empty(window)){
            if(window.localStorage){
                window.localStorage.clear();
            }
        }
    }
}
class File_Logic {
    static get_url = (host,file_filename,size,param) =>{
        host = host ? host : "";
        file_filename = file_filename ? file_filename : "";
        size = size ? size : "";
        param = param ? param : "";
        return host+"/"+size + "_"+file_filename+param;
    }
    static get_by_base64 = (item_file) =>{
        let item = Data_Logic.get(Website_Table.FILE,0,{data:item_file});
        item.extension = !Str.check_is_null(Str.get_file_type_from_base64(item.file_data)) ? Str.get_file_type_from_base64(item.file_data).extension : 'txt';
        item.file_filename = !Str.check_is_null(Str.get_file_type_from_base64(item.file_data)) ? Str.get_guid()+ "." + item.extension : 'not_found.txt';
        item.buffer = !Str.check_is_null(Str.get_file_type_from_base64(item_file.file_data)) ? Buffer.from(item_file.file_data.split(';base64,').pop(), 'base64') : null;
        return item;
    };
};
class Image_Logic {
    static get_url = (host,image_filename,size,param) =>{
        host = host ? host : "";
        image_filename = image_filename ? image_filename : "";
        size = size ? size : "";
        param = param ? param : "";
        return host+"/"+size + "_"+image_filename+param;
    }
    static get_by_base64 = (item_image) =>{
        let item = Data_Logic.get(Website_Table.IMAGE,0,{data:item_image});
        item.extension = !Str.check_is_null(Str.get_file_type_from_base64(item.image_data)) ? Str.get_file_type_from_base64(item.image_data).extension : 'jpeg';
        item.image_filename = !Str.check_is_null(Str.get_file_type_from_base64(item.image_data)) ? Str.get_guid()+ "." + item.extension : 'not_found.jpeg';
        item.buffer = !Str.check_is_null(Str.get_file_type_from_base64(item_image.image_data)) ? Buffer.from(item_image.image_data.split(';base64,').pop(), 'base64') : null;
        return item;
    };
    static get_process_items = (upload_dir,image_filename) =>{
        upload_dir = upload_dir ? upload_dir : "";
        image_filename = image_filename ? image_filename : "";
        return [
            {
                image_filename:Website_Type.IMAGE_SIZE_ORIGINAL+"_"+image_filename,
                path_filename:upload_dir+"/"+Website_Type.IMAGE_SIZE_ORIGINAL+"_"+image_filename,
                size:0,
                type_resize:Website_Type.IMAGE_RESIZE_NONE,
            },
            {
                image_filename:Website_Type.IMAGE_SIZE_THUMB+"_"+image_filename,
                path_filename:upload_dir+"/"+Website_Type.IMAGE_SIZE_THUMB+"_"+image_filename,
                size:250,
                type_resize:Website_Type.IMAGE_RESIZE_NORMAL,
            },
            {
                image_filename:Website_Type.IMAGE_SIZE_MID+"_"+image_filename,
                path_filename:upload_dir+"/"+Website_Type.IMAGE_SIZE_MID+"_"+image_filename,
                size:720,
                type_resize:Website_Type.IMAGE_RESIZE_NORMAL,
            },
            {
                image_filename:Website_Type.IMAGE_SIZE_LARGE+"_"+image_filename,
                path_filename:upload_dir+"/"+Website_Type.IMAGE_SIZE_LARGE+"_"+image_filename,
                size:1000,
                type_resize:Website_Type.IMAGE_RESIZE_NORMAL,
            },
            {
                image_filename:Website_Type.IMAGE_SIZE_SQUARE_THUMB+"_"+image_filename,
                path_filename:upload_dir+"/"+Website_Type.IMAGE_SIZE_SQUARE_THUMB+"_"+image_filename,
                size:250,
                type_resize:Website_Type.IMAGE_RESIZE_SQUARE,
            },
            {
                image_filename:Website_Type.IMAGE_SIZE_SQUARE_MID+"_"+image_filename,
                path_filename:upload_dir+"/"+Website_Type.IMAGE_SIZE_SQUARE_MID+"_"+image_filename,
                size:720,
                type_resize:Website_Type.IMAGE_RESIZE_SQUARE,
            },
            {
                image_filename:Website_Type.IMAGE_SIZE_SQUARE_LARGE+"_"+image_filename,
                path_filename:upload_dir+"/"+Website_Type.IMAGE_SIZE_SQUARE_LARGE+"_"+image_filename,
                size:1000,
                type_resize:Website_Type.IMAGE_RESIZE_SQUARE,
            },
        ];
    }
}
class Field_Logic {
    //old no more bp
    static get_field_value_value_old = (value_type,item,value_id) =>{
        if(value_type!=Form_FIeld.ITEMS){
            return "";
        }else{
            return  [];
        }
    };
    //maybe old
    static get_field_value_title = (value_type,value_id,group_id,sub_field_title) =>{
        switch(value_type){
            case Form_Field.TEXT:
                return 'text'+'_value_'+value_id;
                break;
            case Form_Field.NOTE:
                return 'note'+'_value_'+value_id;
                break;
            case Form_Field.IMAGE:
                return 'image'+'_value_'+value_id;
                break;
            case Form_Field.ITEMS:
                if(!group_id){
                    return 'items'+'_value_'+value_id;
                }else{
                    return 'items'+'_value_'+value_id +'_group_' +group_id+"_"+Str.get_title_url(sub_field_title);
                }
                break;
            default:
                return 'text'+'_value_'+value_id;
        };
    }
    static get_test_cost = () =>{
        return String(Num.get_id(999)) + "." + String(Num.get_id(99));
    }
    static get_test_note = () => {
        return "Note "+String(Num.get_id()) + " Lorem Ipsum is simply dummy text of the printing and typesetting industry.";
    }
    static get_field_value_items_title = (value_id) =>{
        return 'items_value_'+value_id;
    }
    /*
    static get_value_items_group(item,value_id,group_id){
        let full_str = 'items_value_'+value_id+"_group_"+group_id;
        let items = [];
        let count = 0;
        for(const prop in item){
            let new_item = {};
            if(prop.startsWith(full_str)){
                count = count+1;
                new_item[prop.replace(full_str+"_","")] = item[prop];
                items.push(new_item);
            }
        }
        return items;
    }
    */
   }
class Template_Logic {
    static get_template_section = (type) => {
        let template_section_list = [
            {value:Str.get_title_url(Website_Title.TEMPLATE_SECTION_HEADER),title:Website_Title.TEMPLATE_SECTION_HEADER,label:Website_Title.TEMPLATE_SECTION_HEADER},
            {value:Str.get_title_url(Website_Title.TEMPLATE_SECTION_BODY),title:Website_Title.TEMPLATE_SECTION_BODY,label:Website_Title.TEMPLATE_SECTION_BODY},
            {value:Str.get_title_url(Website_Title.TEMPLATE_SECTION_FOOTER),title:Website_Title.TEMPLATE_SECTION_FOOTER,label:Website_Title.TEMPLATE_SECTION_FOOTER},
        ];
        return template_section_list.find(item_find => item_find.value === type)? template_section_list.find(item_find => item_find.value === type) : {value:Website_Title.TEMPLATE_SECTION_BODY,title:Website_Title.TEMPLATE_SECTION_BODY,label:Website_Title.TEMPLATE_SECTION_BODY};
    };
    static get_template_sub_value_edit = (template_id,section_type) => {
        return {parent_table:Website_Table.TEMPLATE,parent_id:template_id,section_type:section_type,event_handler:section_type + "_"+Form_Field.MESSAGE};
    };
}
class Page_Logic {
    static get_test = () =>{
        let data = Data_Logic.get(Website_Table.PAGE,0);
        data.title="Title "+ Num.get_id();
        data.value="Value "+ Num.get_id();
        return data;
    };
    static get_page_section = (type) => {
        let page_section_list = [
            {value:Str.get_title_url(Website_Title.PAGE_SECTION_HEADER),title:Website_Title.PAGE_SECTION_HEADER,label:Website_Title.PAGE_SECTION_HEADER},
            {value:Str.get_title_url(Website_Title.PAGE_SECTION_BODY),title:Website_Title.PAGE_SECTION_BODY,label:Website_Title.PAGE_SECTION_BODY},
            {value:Str.get_title_url(Website_Title.PAGE_SECTION_FOOTER),title:Website_Title.PAGE_SECTION_FOOTER,label:Website_Title.PAGE_SECTION_FOOTER}
        ];
        return page_section_list.find(item_find => item_find.value === type)? page_section_list.find(item_find => item_find.value === type) : {value:Website_Title.PAGE_SECTION_BODY,title:Website_Title.PAGE_SECTION_BODY,label:Str.get_title_url(Website_Title.PAGE_SECTION_BODY)};
    };
    static get_page_sub_value_edit = (page_id,section_type) => {
        return {parent_table:Website_Table.PAGE,parent_id:page_id,section_type:section_type,event_handler:Str.get_title_url(section_type+ "_"+Form_Field.MESSAGE)};
    };
    static get_pages = () =>{
        let pages = [
            {type:Str.get_title_url(Website_Title.PAGE_ABOUT),url:Website_Url.PAGE_ABOUT,title:Str.get_title(Website_Title.PAGE_ABOUT)},
            {type:Str.get_title_url(Website_Title.PAGE_BLOG_POST),url:Website_Url.PAGE_BLOG_POST,title:Str.get_title(Website_Title.PAGE_BLOG_POST)},
            {type:Str.get_title_url(Website_Title.PAGE_CONTACT),url:Website_Url.PAGE_CONTACT,title:Str.get_title(Website_Title.PAGE_CONTACT)},
            {type:Str.get_title_url(Website_Title.PAGE_EVENT),url:Website_Url.PAGE_EVENT,title:Str.get_title(Website_Title.PAGE_EVENT)},
            {type:Str.get_title_url(Website_Title.PAGE_FAQ),url:Website_Url.PAGE_FAQ,title:Str.get_title(Website_Title.PAGE_FAQ)},
            {type:Str.get_title_url(Website_Title.PAGE_HOME),url:Website_Url.PAGE_HOME,title:Str.get_title(Website_Title.PAGE_HOME)},
            {type:Str.get_title_url(Website_Title.PAGE_FAQ),url:Website_Url.PAGE_FAQ,title:Str.get_title(Website_Title.PAGE_FAQ)},
            {type:Str.get_title_url(Website_Title.PAGE_GALLERY),url:Website_Url.PAGE_GALLERY,title:Str.get_title(Website_Title.PAGE_GALLERY)},
            {type:Str.get_title_url(Website_Title.PAGE_PRODUCT),url:Website_Url.PAGE_PRODUCT,title:Str.get_title(Website_Title.PAGE_PRODUCT)},
            {type:Str.get_title_url(Website_Title.PAGE_REGISTER),url:Website_Url.PAGE_REGISTER,title:Str.get_title(Website_Title.PAGE_REGISTER)},
            {type:Str.get_title_url(Website_Title.PAGE_SERVICE),url:Website_Url.PAGE_SERVICE,title:Str.get_title(Website_Title.PAGE_SERVICE)}
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
}
module.exports = {
    Form_Field,
    File_Logic,
    Field_Logic,
    Image_Logic,
    Page_Logic,
    Template_Logic,
    Storage_Logic,
    Website_Table,
    Website_Title,
    Website_Type,
    Website_Url
};
