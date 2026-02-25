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
}
class Website_Field {
    static IMAGE_FILENAME = 'image_filename';
    static IMAGES = 'images';
}
class Website_Table {
    static IMAGE="image";
    static FILE="file";
}
class Website_Title {
    static IMAGES='Images';
}
class Website_Type {
    //size
    static IMAGE_SIZE_THUMB="thumb";
    static IMAGE_SIZE_MID="mid";
    static IMAGE_SIZE_LARGE="large";
    static IMAGE_SIZE_ORIGINAL="original";
    static IMAGE_SIZE_SQUARE_THUMB="squre_thumb";
    static IMAGE_SIZE_SQUARE_MID="squre_mid";
    static IMAGE_SIZE_SQUARE_LARGE="squre_large";
    //re_size
    static IMAGE_RESIZE_NORMAL="normal";
    static IMAGE_RESIZE_SQUARE="squre";
    static IMAGE_RESIZE_NONE="none";
    //result
    static RESULT_OK_GROUP_IMAGE_DELETE = 'group_image_delete_resultOK';
    static RESULT_OK_IMAGE_DELETE = 'image_delete_resultOK';
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
module.exports = {
    File_Logic,
    Image_Logic,
    Storage_Logic,
    Website_Field,
    Website_Table,
    Website_Title,
    Website_Type,
    Website_Url
};
