$(document).ready(function () {

    var ajax_data = [{
            fname: "Code",
            lname: "With Mark",
            phone: '555-554-1223',
            email: "mark@codewithmark.com"
        },
        {
            fname: "Mary",
            lname: "Moe",
            phone: '555-554-1223',
            email: "mary@gmail.com"
        },
        {
            fname: "John",
            lname: "Doe",
            phone: '555-554-1223',
            email: "john@yahoo.com"
        },
        {
            fname: "Julie",
            lname: "Dooley",
            phone: '555-554-1223',
            email: "julie@gmail.com"
        },
        {
            fname: "Jennifer",
            lname: "Dawson",
            phone: '555-554-1223',
            email: "jdawson@gmail.com"
        }
    ];

    var tbl = '';
    tbl += '<table class="table table-hover">';
    tbl += '<thead>';
    tbl += '<tr>';
    tbl += '<th>First Name</th>';
    tbl += '<th>Last Name</th>';
    tbl += '<th>Phone</th>';
    tbl += '<th>Email</th>';
    tbl += '<th>Edit</th>';
    tbl += '</tr>';
    tbl += '</thead>';
    tbl += '<tbody>';
    var i = 0;
    $.each(ajax_data, function (index, val) {
        var rwId = i++;
        tbl += '<tr id="' + rwId + '" class="main-rw">';
        tbl += '<td><div class="row_data" edit_type="click" col_name="fname">' + val['fname'] + '</div></td>';
        tbl += '<td><div class="row_data" edit_type="click" col_name="lname">' + val['lname'] + '</div></td>';
        tbl += '<td><div class="row_data" edit_type="click" col_name="phone">' + val['phone'] + '</div></td>';
        tbl += '<td><div class="row_data" edit_type="click" col_name="email">' + val['email'] + '</div></td>';
        tbl += '<td><a id="edit-btn-' + rwId + '" class="edit-btn">e</a></td>';
        tbl += '</tr>';
        tbl += '<tr id="edit-rw-' + rwId + '" class="edit-rw" hidden="hidden">';
        tbl += '<td colspan="5">';
        tbl += '<ul>';
        tbl += '<li><button id="cancel">Cancel</button></li>';
        tbl += '<li><button id="delete">Delete</button></li>';
        tbl += '<li><button id="save">Save</button></li>';
        tbl += '</ul>';
        tbl += '</td>';
        tbl += '</tr>';
    });
    tbl += '</tbody>';
    tbl += '<tbody>';
    tbl += '<tr id="nw-rw-flds" class="">';
    tbl += '<td><div class="row_data" edit_type="click" col_name="fname">First Name</div></td>';
    tbl += '<td><div class="row_data" edit_type="click" col_name="lname">Last Name</div></td>';
    tbl += '<td><div class="row_data" edit_type="click" col_name="phone">Phone</div></td>';
    tbl += '<td><div class="row_data" edit_type="click" col_name="email">Email</div></td>';
    tbl += '<td></td>';
    tbl += '</tr>';
    tbl += '<tr id="nw-rw-opts">';
    tbl += '<td colspan="5">';
    tbl += '<ul>';
    tbl += '<li><button id="nw-rw-add">+</button></li>';
    tbl += '<li><button id="cancel" class="opt-btn">Cancel</button></li>';
    tbl += '<li><button id="save" class="opt-btn">Save</button></li>';
    tbl += '</ul>';
    tbl += '</td>';
    tbl += '</tr>';
    tbl += '</tbody>';
    tbl += '</table>'

    // out put table data
    $(document).find('#data-table').html(tbl);

    // show and hide option menu
    var mr = '.main-rw',
        er = '.edit-rw',
        tbdy = 'tbody',
        trId = '',
        eBtn = '.edit-btn';

    $(eBtn).mouseenter(function () {
        // console.log(this);

        var trNum = $(this).parent().parent().attr('id');
        trId = '#' + trNum,
            trAttr = $(trId).attr('class'),
            trClass = '.' + trAttr,
            eBtnId = '#edit-btn-' + trNum;

        $(trId).addClass('ready');

        if ($(trId + trClass).hasClass('active')) {
            $(trId + trClass).removeClass('ready');
        }

        $(document).on('click', eBtnId, function (event) {
            event.preventDefault();

            er = '.edit-rw';
            var erNum = '#edit-rw-' + trNum;

            // console.log(erNum);

            if ($(trId).hasClass('active')) {

                console.log('this row active and opened');

            } else if ($(mr).hasClass('active') && $(er).hasClass('opened')) {

                console.log('another row active and opened');

                $(er).attr('hidden', true).removeClass('opened');
                $(mr + ' td div').removeAttr('contenteditable').removeClass('bg-warning').css('padding', '0px');
                $(mr).removeClass('active');

            } else {

                console.log('activating this row');

                $(trId).addClass('active').removeClass('ready');

                console.log(erNum);

                $(trId + ' td div').attr('contenteditable', true).attr('edit_type', 'button').addClass('bg-warning').css('padding', '3px');
                // $(this).focus();

                if ($(mr).hasClass('active')) {
                    $(erNum).attr('hidden', false).addClass('opened');
                }
            };

            //--->button > delete
            $(document).on('click', '#delete', function (event) {
                event.preventDefault();

                var active_rw = $('.active');

                // console.log(active_rw);

                //make the whole row editable
                $('.active').find('.row_data').attr('contenteditable', 'true').attr('edit_type', 'button').addClass('bg-warning').css('padding', '3px');

                //--->add the original entry > start
                $(active_rw).find('.row_data').each(function (index, val) {
                    //this will help in case user decided to click on cancel button
                    // $(this).attr('original_entry', $(this).remove());
                    $(this).remove();
                    $(active_rw).remove();
                    $('.opened').remove();
                });
                //--->add the original entry > end

            });

            //--->button > cancel
            $(document).on('click', '#cancel', function (event) {
                event.preventDefault();

                console.log('cancel');

                $(erNum).attr('hidden', true).removeClass('opened');
                $(trId).removeClass('active');

                $(trId + ' td div').removeAttr('contenteditable').attr('edit_type', 'click').removeClass('bg-warning').css('padding', '');

                $('.post_msg').hide();

                var active_rw = $('.active');

                //make the whole row editable
                $('.active').find('.row_data').attr('edit_type', 'click').removeClass('bg-warning').css('padding', '');

                $(active_rw).find('.row_data').each(function (index, val) {
                    $(this).html($(this).attr('original_entry'));
                });
            });

            //---> SAVE SINGLE FIELD DATA
            $(document).on('click', '#save', function (event) {
                event.preventDefault();
                // console.log('save');

                // console.log(event);
                var active_rw = $('.active');

                $('.active').find('.row_data').removeAttr('contenteditable').attr('edit_type', 'button').removeClass('bg-warning').css('padding', '');

                // $('.opened').hide();

                $('.post_msg').show();

                var arr = {};
                $(active_rw).find('.row_data').each(function (index, val) {
                    var col_name = $(this).attr('col_name');
                    var col_val = $(this).html();
                    arr[col_name] = col_val;
                });

                // OUT PUT TO SHOW
                $('.post_msg').html('<pre class="bg-success">' + JSON.stringify(arr, null, 2) + '</pre>');
            });

        });

    });

    $(mr).mouseout(function () {
        $(mr).removeClass('ready');
    });

    $('#nw-rw-flds').hide();
    $('#nw-rw-opts .opt-btn').hide();

    $(document).on('click', '#nw-rw-add', function () {
        $('#nw-rw-flds').show();
        $('#nw-rw-opts .opt-btn').show();
        console.log('show new row info');

        $('#nw-rw-flds td div').attr('contenteditable', true).attr('edit_type', 'button').addClass('bg-warning').css('padding', '3px');

        $('#nw-rw-opts #cancel').click(function () {
            console.log('canceled new row input');
            $('#nw-rw-flds').hide();
            $('#nw-rw-opts .opt-btn').hide();
            $('#nw-rw-flds td div').attr('contenteditable', false).attr('edit_type', 'click').removeClass('bg-warning').css('padding', '0px');
        });

        $('#nw-rw-opts #save').click(function () {
            console.log('save ?');
            event.preventDefault();
            // console.log('save');

            // console.log(event);
            // var active_rw = $('.active');

            // $('.active').find('.row_data').removeAttr('contenteditable').attr('edit_type', 'button').removeClass('bg-warning').css('padding','');

            // // $('.opened').hide();

            $('.post_msg').show();

            var arr = {};
            $('#nw-rw-flds').find('.row_data').each(function (index, val) {
                var col_name = $(this).attr('col_name');
                var col_val = $(this).html();
                arr[col_name] = col_val;
            });

            // OUT PUT TO SHOW
            $('.post_msg').html('<pre class="bg-success">' + JSON.stringify(arr, null, 2) + '</pre>');
        });

    });

});