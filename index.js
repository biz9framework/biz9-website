/*
Copyright 2016 Certified CoderZ
Author: Brandon Poole Sr. (biz9framework@gmail.com)
License GNU General Public License v3.0
Description: BiZ9 Framework: Website
*/
const {Scriptz}=require("biz9-scriptz");
const {Data_Logic}=require("biz9-data-logic");
const {Log}=require("biz9-utility");
class Website_Url {
    static IMAGE_POST="biz9/image/post";
    static IMAGE_CDN_POST="biz9/image/cdn_post";
    //page
    static PAGE_ABOUT="page/about";
    static PAGE_BLOG_POST="page/blog_post";
    static PAGE_BLOG_POST_HOME="page/blog_post_home";
    static PAGE_BLOG_POST_SEARCH="page/blog_post_search";
    static PAGE_CONTACT="page/contact";
    static PAGE_EVENT="page/event";
    static PAGE_EVENT_HOME="page/event_home";
    static PAGE_EVENT_SEARCH="page/event_search";
    static PAGE_FAQ="page/faq";
    static PAGE_GALLERY="page/gallery";
    static PAGE_GALLERY_HOME="page/gallery_home";
    static PAGE_GALLERY_SEARCH="page/gallery_search";
    static PAGE_HOME="index";
    static PAGE_LOGIN="page/login";
    static PAGE_PRODUCT="page/product";
    static PAGE_PRODUCT_HOME="page/product_home";
    static PAGE_PRODUCT_SEARCH="page/product_search";
    static PAGE_REGISTER="user/register";
    static PAGE_SERVICE="page/service";
    static PAGE_SERVICE_HOME="page/service_home";
    static PAGE_SERVICE_SEARCH="page/service_search";
    static PAGE_REVIEW_HOME="page/review_home";
}
class Website_Field {
    //image
    static IMAGE_FILENAME = 'image_filename';
    static IMAGES = 'images';
}
class Website_Table {
    static IMAGE="image_biz";
    static FILE="file_biz";
    static PAGE="page_biz";
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

}
class Website_Type {
   //result
    static RESULT_OK_GROUP_IMAGE_DELETE = 'group_image_delete_resultOK';
    static RESULT_OK_IMAGE_DELETE = 'image_delete_resultOK';
    //field_value
    static FIELD_VALUE_TEXT="text";
    static FIELD_VALUE_NOTE="note";
    static FIELD_VALUE_IMAGE="image";
    static FIELD_VALUE_ITEMS="items";
    static FIELD_MESSAGE="message";
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
    static get_field_value_value = (value_type,item,value_id) =>{
        if(value_type!=Website_Type.FIELD_VALUE_ITEMS){
            return ""
        }else{
            return  [];
        }
    };
    static get_field_value_title = (value_type,value_id,group_id,sub_field_title) =>{
        switch(value_type){
            case Website_Type.FIELD_VALUE_TEXT:
                return 'text'+'_value_'+value_id;
                break;
            case Website_Type.FIELD_VALUE_NOTE:
                return 'note'+'_value_'+value_id;
                break;
            case Website_Type.FIELD_VALUE_IMAGE:
                return 'image'+'_value_'+value_id;
                break;
            case Website_Type.FIELD_VALUE_ITEMS:
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
    static get_test_cost(){
        return String(Num.get_id(999)) + "." + String(Num.get_id(99));
    }
    static get_test_note = () => {
        return "Note "+String(Num.get_id()) + " Lorem Ipsum is simply dummy text of the printing and typesetting industry.";
    }
    static get_field_value_items_title(value_id){
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
class Page_Logic {
    static get_test = () =>{
        let data = Data_Logic.get(Website_Table.PAGE,0);
        data.title="Title "+ Num.get_id();
        data.value="Value "+ Num.get_id();
        return data;
    };
    static get_page_section(type){
        let page_section_list = [
            {value:Title.PAGE_SECTION_HEADER,title:Title.PAGE_SECTION_HEADER,label:Str.get_title_url(Title.PAGE_SECTION_HEADER)},
            {value:Title.PAGE_SECTION_BODY,title:Title.PAGE_SECTION_BODY,label:Str.get_title_url(Title.PAGE_SECTION_BODY)},
            {value:Title.PAGE_SECTION_FOOTER,title:Title.PAGE_SECTION_FOOTER,label:Str.get_title_url(Title.PAGE_SECTION_FOOTER)},
        ];
        return page_section_list.find(item_find => item_find.value === type)? page_section_list.find(item_find => item_find.value === type) : {value:Title.PAGE_SECTION_BODY,title:Title.PAGE_SECTION_BODY,label:Str.get_title_url(Type.PAGE_SECTION_BODY)};
    };
    static get_page_sub_value_edit = (page_id,section_type) => {
        return {parent_table:Website_Table.PAGE,parent_id:page_id,section_type:section_type,event_handler:section_type + "_"+Type.FIELD_MESSAGE};
    };
    static get_pages(){
        return [
            {value:Title.PAGE_ABOUT,title:Title.PAGE_ABOUT,label:Str.get_title_url(Type.PAGE_ABOUT),url:Website_Url.PAGE_ABOUT},

            {value:Type.PAGE_BLOG_POST,title:Type.TITLE_PAGE_BLOG_POST,label:Type.TITLE_PAGE_BLOG_POST,url:Url.PAGE_BLOG_POST},

            {value:Type.PAGE_BLOG_POST_HOME,title:Type.TITLE_PAGE_BLOG_POST_HOME,label:Type.TITLE_PAGE_BLOG_POST_HOME,url:Url.PAGE_BLOG_POST_HOME},
            {value:Type.PAGE_CONTACT,title:Type.TITLE_PAGE_CONTACT,label:Type.TITLE_PAGE_CONTACT,url:Url.PAGE_CONTACT},
            {value:Type.PAGE_EVENT,title:Type.TITLE_PAGE_EVENT,label:Type.TITLE_PAGE_EVENT,url:Url.PAGE_EVENT},
            {value:Type.PAGE_EVENT_HOME,title:Type.TITLE_PAGE_EVENT_HOME,label:Type.TITLE_PAGE_EVENT_HOME,url:Url.PAGE_EVENT_HOME},
            {value:Type.PAGE_FAQ,title:Type.TITLE_PAGE_FAQ,label:Type.TITLE_PAGE_FAQ,url:Url.PAGE_FAQ},
            {value:Type.PAGE_HOME,title:Type.TITLE_PAGE_HOME,label:Type.TITLE_PAGE_HOME,url:Url.PAGE_HOME},
            {value:Type.PAGE_GALLERY,title:Type.TITLE_PAGE_GALLERY,label:Type.TITLE_PAGE_GALLERY,url:Url.PAGE_GALLERY},
            {value:Type.PAGE_GALLERY_HOME,title:Type.TITLE_PAGE_GALLERY_HOME,label:Type.TITLE_PAGE_GALLERY_HOME,url:Url.PAGE_GALLERY_HOME},
            {value:Type.PAGE_LOGIN,title:Type.TITLE_PAGE_LOGIN,label:Type.TITLE_PAGE_LOGIN,url:Url.PAGE_LOGIN},
            {value:Type.PAGE_PRODUCT,title:Type.TITLE_PAGE_PRODUCT,label:Type.TITLE_PAGE_PRODUCT,url:Url.PAGE_PRODUCT},
            {value:Type.PAGE_PRODUCT_HOME,title:Type.TITLE_PAGE_PRODUCT_HOME,label:Type.TITLE_PAGE_PRODUCT_HOME,url:Url.PAGE_PRODUCT_HOME},
            {value:Type.PAGE_REGISTER,title:Type.TITLE_PAGE_REGISTER,label:Type.TITLE_PAGE_REGISTER,url:Url.REGISTER},
            {value:Type.PAGE_REVIEW_HOME,title:Type.TITLE_PAGE_REVIEW_HOME,label:Type.TITLE_PAGE_REVIEW_HOME,url:Url.PAGE_REVIEW_HOME},
            {value:Type.PAGE_SERVICE,title:Type.TITLE_PAGE_SERVICE,label:Type.TITLE_PAGE_SERVICE,url:Url.PAGE_SERVICE},
            {value:Type.PAGE_SERVICE_HOME,title:Type.TITLE_PAGE_SERVICE_HOME,label:Type.TITLE_PAGE_SERVICE_HOME,url:Url.PAGE_SERVICE_HOME},
        ];
    };
}

module.exports = {
    File_Logic,
    Image_Logic,
    Page_Logic,
    Storage_Logic,
    Website_Field,
    Website_Table,
    Website_Title,
    Website_Type,
    Website_Url
};
