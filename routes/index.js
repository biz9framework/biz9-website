var express = require('express');
var router = express.Router();
router.get('/ping',function(req, res, next) {
    res.send({'biz9-web':'ping','ENV':ENV});
    res.end();
});
router.get('/',function(req, res) {
    var helper = biz9.get_helper(req);
    helper.render='index';
    helper.page_title = APP_TITLE +': Home';
    helper.item = biz9.get_new_item(DT_BLANK,0);
    async.series([
        function(call){
            biz9.get_client_db(function(error,_client_db){
                client_db=_client_db;
                db = client_db.db(helper.app_title_id);
                call();
            });
        },
        function(call){
            sql={};
            sort={date_create:1};
            page_current=1;
            page_size=9;
            biz9.get_blog_postz(db,sql,sort,page_current,page_size,function(error,result_list,total_count,page_count) {
                console.log('rrr');
                console.log(result_list);
                helper.blog_post_list=result_list;
                call();
            });
        },
        function(call){
            biz9.close_client_db(client_db,function(error){
                call();
            });
        },
    ],
        function(err, results){
            res.render(helper.render,{helper:helper});
            res.end();
        });
});
router.get('/about',function(req, res) {
    var helper = biz9.get_helper(req);
    helper.render='about';
    helper.page_title = APP_TITLE +': About';
    helper.item = biz9.get_new_item(DT_BLANK,0);
    async.series([
        function(call){
            biz9.get_client_db(function(error,_client_db){
                client_db=_client_db;
                db = client_db.db(helper.app_title_id);
                call();
            });
        },
        function(call){
            title_url='primary';
            biz9.get_page(db,title_url,{},function(error,page){
                helper.primary=page;
                call();
            });
        },
        function(call){
            title_url='about';
            biz9.get_page(db,title_url,{},function(error,page){
                helper.about=page;
                call();
            });
        },
        function(call){
            biz9.close_client_db(client_db,function(error){
                call();
            });
        },
    ],
        function(err, results){
            res.render(helper.render,{helper:helper});
            res.end();
        });
});
router.get('/contact',function(req, res) {
    var helper = biz9.get_helper(req);
    helper.render='contact';
    helper.page_title = APP_TITLE +': Contact';
    helper.item = biz9.get_new_item(DT_BLANK,0);
    async.series([
        function(call){
            biz9.get_client_db(function(error,_client_db){
                client_db=_client_db;
                db = client_db.db(helper.app_title_id);
                call();
            });
        },
        function(call){
            title_url='primary';
            biz9.get_page(db,title_url,{},function(error,page){
                helper.primary=page;
                call();
            });
        },
        function(call){
            title_url='contact';
            biz9.get_page(db,title_url,{},function(error,page){
                helper.contact=page;
                call();
            });
        },
        function(call){
            biz9.close_client_db(client_db,function(error){
                call();
            });
        },
    ],
        function(err, results){
            res.render(helper.render,{helper:helper});
            res.end();
        });
});
router.get('/brevo_mail_form',function(req, res) {
    var helper = biz9.get_helper(req);
    helper.render='brevo_mail_form';
    helper.page_title = APP_TITLE +': Brevo Mail Form';
    helper.item = biz9.get_new_item(DT_BLANK,0);
    async.series([
        function(call){
            biz9.get_client_db(function(error,_client_db){
                client_db=_client_db;
                db = client_db.db(helper.app_title_id);
                call();
            });
        },
        function(call){
            title_url='primary';
            biz9.get_page(db,title_url,{},function(error,page){
                helper.primary=page;
                call();
            });
        },
        function(call){
            biz9.close_client_db(client_db,function(error){
                call();
            });
        },
    ],
        function(err, results){
            res.render(helper.render,{helper:helper});
            res.end();
        });
});
///9_sql
router.get('/sql',function(req, res) {
    var helper = biz9.get_helper(req, biz9.get_helper(req));
    helper.render='index';
    helper.page_title = APP_TITLE +': Home';
    helper.item = biz9.get_new_item(DT_BLANK,0);
    async.series([
        function(call){
            biz9.get_client_db(function(error,_client_db){
                client_db=_client_db;
                db = client_db.db(helper.app_title_id);
                call();
            });
        },
        function(call){
            helper.item=biz9.get_test_item(DT_BLANK,0);
            biz9.update_item(db,DT_BLANK,helper.item,function(error,result) {
                helper.item=result;
                biz9.o('UPDATE_ITEM',helper.item);
                call();
            });
        },
        function(call){
            sql = {};
            sort={};
            biz9.get_sql(db,DT_BLANK,sql,sort,function(error,result_list) {
                helper.blank_list=result_list;
                biz9.o('GET_SQL',result_list);
                call();
            });
        },
        function(call){
            sql = {};
            sort={date_create:-1};
            page_current=helper.page_current;
            page_size=12;
            biz9.get_sql_paging(db,DT_PRODUCT,sql,sort,page_current,page_size,function(error,result_list,total_count,page_count){
                helper.item_list=result_list;
                helper.total_count=total_count;
                helper.page_count=page_count;
                call();
            });
        },
        function(call){
            biz9.get_item(db,DT_BLANK,helper.item.tbl_id,function(error,result) {
                biz9.o('GET_ITEM',result);
                call();
            });
        },
        function(call){
            biz9.delete_item(db,helper.item.data_type,helper.item.tbl_id,function(error,result) {
                biz9.o('DELETE_ITEM',result);
                call();
            });
        },
        function(call){
            biz9.close_client_db(client_db,function(error){
                call();
            });
        },
    ],
        function(err, results){
            res.render(helper.render,{helper:helper});
            res.end();
        });
});

module.exports = router;
