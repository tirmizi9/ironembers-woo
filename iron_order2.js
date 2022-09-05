function checkOffset() {
	if(jQuery('.wc_iron_subtotal').length > 0) {
		if(jQuery('.wc_iron_subtotal').offset().top + jQuery('.wc_iron_subtotal').height()
											   >= jQuery('#footer').offset().top - 0)
			jQuery('.wc_iron_subtotal').css('position', 'absolute');
		if(jQuery(document).scrollTop() + window.innerHeight < jQuery('#footer').offset().top)
			jQuery('.wc_iron_subtotal').css('position', 'fixed'); // restore when you scroll up
		/*jQuery('.wc_iron_subtotal').text(jQuery(document).scrollTop() + window.innerHeight);*/
	}
}

jQuery(document).scroll(function() {
	checkOffset();
});

var productarray;

jQuery(document).ready(function($) {
	var productid = $("#inquery_active_productid").val();
	//console.log(productid);
	
	$("#wc_size_img_" + productid).prop("checked", true);
	/* var productid = $("#wc_size_img_2089").attr("value"); */

	var targetaccessary = (".wc_shape_accessory_" + productid);
	$(targetaccessary).show();
	var targetsizeproduct = $("#wp_size_" + productid);
	$(targetsizeproduct).css('display', 'block');
	productarray = $("#productarray").val();
	
	// Fire pit shape selection
	$('.iron_product_shape').click(function() {
		var shapetitle = $(this).attr("data-title");
		var targetBox = $(".wc_" + shapetitle);
		$("ul.wc_shape li.shape_item").removeClass('active_shape_item');
		$(".wpb_text_column").removeClass("active_shape");
		var targetclass = (".wc_shape_" + shapetitle);
		$(targetclass).addClass("active_shape");
		var targetdescription = $(".wc_shape_description_" + shapetitle);
		
		$(".iron_row_shape").hide();
		$("ul.wc_shape_list li").hide();
		$(".wc_shape_accessory").hide();
		$(".wc_size_variatation_row").hide();
		$(".wc_access_rmv_btn_varaiable").hide();
		$(".wc_access_select_option_btn").show();
		$(".wc_shape_description").hide();
		$(".iron_black_section").hide();
		$(targetBox).show();
		
		var targetselectedproduct = $(targetBox).find('ul li:nth-child(2) input:radio[name=rdo_product_' +
			shapetitle + ']:first').val();
		var targetselectedshapeproductprice = parseFloat($(targetBox).find('ul li:nth-child(2) input:radio[name=rdo_product_' + shapetitle + ']:first').attr('data-product_sku'));
		
		console.log('iron_product_shape: ' + targetselectedproduct + ', price: ' +
			targetselectedshapeproductprice);
		var prodprc = parseFloat($(this).attr("data-product_sku"));
		$('#wp_size_' + targetselectedproduct).show();
		$('.shape_item_' + targetselectedproduct).addClass('active_shape_item');
		var targetaccess = (".wc_shape_accessory_" + targetselectedproduct);
		console.log('47 targetaccess ' + targetaccess);
			
		$(targetaccess).show();
		$(targetdescription).show();
		$(".wc_iron_total").text('$' + targetselectedshapeproductprice.toFixed(0) + ' CAD');
		$(".wc_access_rmv_btn").hide();
		$(".add_to_order_button").show();
		
		$("#wc_iron_subttl").val(targetselectedshapeproductprice.toFixed(0));
		$("#wc_iron_prod_id").val(targetselectedproduct + ',');
	});
	 
	// shape_item iron_black_section iron_accessories_addon
	$('.shape_item').click(function() {
		var datashapeid = $(this).attr('data-shape-id');
		console.log('64 ' + datashapeid);
		var radButton = $(this).find('input[type=radio]');
		$(radButton).prop("checked", true);
		var targetRbtn = $(radButton).attr('id');
		var TargetRbtnn = '#' + targetRbtn;
        var inputValue = $(TargetRbtnn).attr("value");
		var inputsku = parseFloat($(TargetRbtnn).attr("data-product_sku"));
        var targetBox = $("#wp_size_" + inputValue);
		
		$("ul.wc_shape li.shape_item").removeClass('active_shape_item');
		$(this).addClass('active_shape_item');
        $("ul.wc_shape_list li").hide();
        $(targetBox).css('display','block');

		var targetaccessary2 = (".wc_shape_accessory_" + inputValue);
		$(".wc_shape_accessory").hide();
		$(targetaccessary2).show();
		$(".wc_access_rmv_btn").hide();
		$(".add_to_order_button").show();
		$(".wc_size_variatation_row").hide();
		$(".wc_access_rmv_btn_varaiable").hide();
		$(".wc_access_select_option_btn").show();
		$("#wc_iron_subttl").val(inputsku.toFixed(0));
		console.log('2 85 shape_item' + inputsku.toFixed(0));
		$("#wc_iron_prod_id").val(inputValue + ',');
		$(".wc_iron_total").text('$' + inputsku.toFixed(0) + ' CAD');
    });
	
	// wc_iron_total
	$('.wc_access_cart_btn').click(function() {
		var action = $(this).attr("data-action");
		var product_id = $(this).attr("data-product_id");
		var grp_prod_id = $('#wc_iron_prod_id').val();
		var prodprc = parseFloat($(this).attr("data-product_sku"));
		var subbtt = parseFloat($("#wc_iron_subttl").val());
		var hasaddon =  $(this).attr('data-addon');
	   
		if(action == 'remove') {
			$(this).hide();
			$(this).closest(".accessory-cart").children(".add_to_order_button").show();
			var targetid = (product_id + ',');
			grp_prod_id = grp_prod_id.replace(targetid,'');
			var ttprice = parseFloat(subbtt) - parseFloat(prodprc);
			console.log('100 ' + subbtt + ' - ' + prodprc);
			console.log('104 ' + ttprice);
			
			if(ttprice == 0) $('.wc_iron_subtotal').hide();

			var hdd_id_attr = $(this).attr('hiddenproduct_id');
			/* if (typeof hdd_id_attr !== typeof 'undefined' && hdd_id_attr !== false  ) { */
			if($(this).is('[hiddenproduct_id]') && $(this).attr('hiddenproduct_id')!= '') {
				var hiddenproduct_id = $(this).attr('hiddenproduct_id');
				grp_prod_id = grp_prod_id.replace(hiddenproduct_id, '');
				var hiddenproduct_p =  parseFloat($(this).attr('hiddenproduct_sku'));
				console.log('113 ' + ttprice + ' - ' + hiddenproduct_p);
				ttprice = parseFloat(ttprice) - parseFloat(hiddenproduct_p);

				console.log('111 ' + ttprice);
			}
			
			if(hasaddon == 'has_addon') {
				$(this).attr('hiddenproduct_sku', '');
				$(this).attr('hiddenproduct_id', '');
				
				$('.wc_access_cart_btn_'+product_id).attr('hiddenproduct_sku', '');
				$('.wc_access_cart_btn_'+product_id).attr('hiddenproduct_id', '');
				$('.iron_selected_accessories_addon_prod_'+product_id).attr('data-product_sku', '');
				$('.iron_selected_accessories_addon_prod_'+product_id).val('');
				var selctedaddon = $('.iron_black_section_' + product_id).children().children().children('.iron_accessories_addon').removeClass('iron_accessories_addon_selected');
				$('.iron_black_section_' + product_id).hide();
			} else if(hasaddon == 'has_child') {
				$('#wc_size_variatation_' + product_id).hide();
			} /* end of action == 'remove' */
		} else {
			if($('.wc_iron_subtotal').css('display') == 'none')
				$('.wc_iron_subtotal').show();
			
			$(this).hide();
			$(this).closest(".accessory-cart").children(".wc_access_rmv_btn").show();
			grp_prod_id = product_id + ',' + grp_prod_id;
			var ttprice = parseFloat(prodprc) + parseFloat(subbtt);
			console.log('137 ' + prodprc + ' + ' + subbtt);
			console.log('3 138 ' + ttprice.toFixed(2));
			
			if(hasaddon == 'has_addon') $('.iron_black_section_' + product_id).show();
			
			if(hasaddon == 'has_child') $('#wc_size_variatation_' + product_id).show();
		}
		
		$('#wc_iron_prod_id').val(grp_prod_id);
		$(".wc_iron_total").text('$' + ttprice.toFixed(0) + ' CAD');
		$("#wc_iron_subttl").val(ttprice.toFixed(0));
	});
	
	// iron_accessories_addon 
	$('.iron_accessories_addon').click(function() {
		var parent_product_id = $(this).attr("data-prod-parent");
		var grp_prod_id = $('#wc_iron_prod_id').val();
		var hiddenbox = $(this).parent().parent().children().children(".iron_selected_accessories_addon_prod_" +
			parent_product_id);
		var subbtt1 = parseFloat($("#wc_iron_subttl").val());
		
		if($(hiddenbox).val() != '') {
			$('.iron_accessories_addon').removeClass('iron_accessories_addon_selected');
			var rproduct_id = $(hiddenbox).val();
			var prodprc = parseFloat($(hiddenbox).attr("data-product_sku"));
			var targetid =  (rproduct_id + ',');
			grp_prod_id = grp_prod_id.replace(targetid, '');
			console.log('160 ' + subbtt1 + ' - ' + prodprc);
			subbtt2 = parseFloat(subbtt1) - parseFloat(prodprc);
		    $("#wc_iron_subttl").val(subbtt2);
			console.log('4 162 ' + subbtt2);
		    // if(ttprice == 0 ){ $('.wc_iron_subtotal').hide();}
		    $(hiddenbox).val('');
			$(hiddenbox).attr("data-product_sku", '');
		}
		
		$(this).addClass('iron_accessories_addon_selected');
		var excerpt = $(this).children('.iron_hidden_excerpt').html();
		var texcerpt = $(this).parent().parent().parent().children().children('.iron_selected_excerpt');
		
		if($(texcerpt).is(':visible')) { } else {
			$(texcerpt).show();
		}
		
		$(texcerpt).html(excerpt);
		var action = $(this).attr("data-action");
		var product_id = $(this).attr("data-product_id");
		var prodprc = parseFloat($(this).attr("data-product_sku"));
		var subbtt = parseFloat($("#wc_iron_subttl").val());
		grp_prod_id = product_id + ',' + grp_prod_id;
		console.log('180 ' + prodprc + ' + ' + subbtt);
		var ttprice = parseFloat(prodprc) + parseFloat(subbtt);
		console.log('5 181 ' + ttprice.toFixed(2));
		$('#wc_iron_prod_id').val(grp_prod_id);
		$(".wc_iron_total").text('$' + ttprice.toFixed(0) + ' CAD');
		$("#wc_iron_subttl").val(ttprice.toFixed(0));
		$(hiddenbox).val(product_id);
		$(hiddenbox).attr("data-product_sku", prodprc);
		var editbtn = '.iron_edit_selection_btn_' + parent_product_id;
		$(editbtn).trigger('click');		 
	});
	
	// iron_make_selection_btn
	$('.iron_make_selection_btn').click(function() {
		 $(this).hide();
		 $(this).parent().parent().parent('.iron_black_section').children('.iron_black_section_items').show();
	});
	
	// iron_edit_selection_btn
	$('.iron_edit_selection_btn').click(function() {
		var Prnt_prodt_id = $(this).attr("data-prod-parent");
			/* $(this).parent().parent(".iron_black_section_items").hide();
			   $(".iron_selected_excerpt").hide();
			   var targetBox =  $(this).parent().parent().parent('.iron_black_section').children(".vc_column-inner").children(".vc_col-sm-5").children(".iron_make_selection_btn");
			   $(targetBox).show(); */
		var targetbtn = $(this).parent().parent().parent().parent('ul').children('li.wc_size_acces_' +
			Prnt_prodt_id).children(".iron_wc_size_acces").children(".vc_col-sm-7").children(".vc_column-inner").children(".accessory-cart").children('.wc_access_cart_btn_' + Prnt_prodt_id);
		var hiddenbox =  $(this).parent().children(".iron_selected_accessories_addon_prod");
		var hiddenproduct_sku = parseFloat($(hiddenbox).attr("data-product_sku"));
		var hiddenproduct_id = $(hiddenbox).val();
		$(targetbtn).attr('hiddenproduct_id', hiddenproduct_id);
		$(targetbtn).attr('hiddenproduct_sku', hiddenproduct_sku);
		var targetbtn2 = $(this).parent().parent().parent().parent('ul').children('li.wc_size_acces_' +
			Prnt_prodt_id).children(".iron_wc_size_acces").children(".vc_col-sm-7").children(".vc_column-inner").children(".accessory-cart").children('.wc_access_add_cart_btn_' + Prnt_prodt_id);
		
		if($(targetbtn2).is(':visible')) {
			$(targetbtn2).trigger('click');
		}
	});
	
  // Netstellar start script 
	// Proceed to Checkout button (modal)
	 $('.wc_iron_place_order_btn').on('click', function(e) {
		e.preventDefault();

   
    
		var grp_prod_id = $('#wc_iron_prod_id').val();
		
		if(grp_prod_id != '') {
			// var grp_prod_idd = grp_prod_id.slice(0,-1);
			var grp_prod_idd = grp_prod_id.substring(0, grp_prod_id.length - 1);
			// console.log(wc_iron_place_order_obj.ajaxurl);
			console.log('order_item_id: ' + grp_prod_idd);
			
			$.ajax({
				url: wc_iron_place_order_obj.ajaxurl,
				type: 'post',
				data: {
					action: 'mjt_woocommerce_ajax_add_to_cart',
					post_id: grp_prod_idd
				},
				beforeSend: function(response) {
					$('#orderinquiry').hide();
					//$('.iron_waiting').removeClass('iron_hide_waiting').addClass('iron_show_waiting');
				},
				complete: function(response) {
					//$('.iron_waiting').removeClass('iron_show_waiting').addClass('iron_hide_waiting');
				},
				success: function(data) {
						console.log('data-'+data);
						$('.wc_iron_subtotal').show();
            window.location.href = '/checkout/';
				},
				error: function(errorThrown) {
					// alert(errorThrown);
					console.log(errorThrown);
					//alert('An error occured. Please try again');
					$('.wc_iron_subtotal').show();
				}
			});
		}
    
	}); 
	
	// Make Selection button (variations)
	$('.wc_access_select_option_btn').on('click', function() {
		let product_id = $(this).attr("data-product_id");
		let parent_id = $(this).attr("data-parent-product");
		console.log('product_id: ' + product_id, 'parent_id: ' + parent_id);
		$('#wc_size_variatation_' + product_id + '_' + parent_id).toggle();
	});
	
	$('a.closebtn').click(function() {
		//console.log('closebtn');
		$(this).parent().parent('.modal').hide();
		// $('.wc_iron_subtotal').show();
	});
	
	// Variation selection
	$('.wc_size_variatation a').on('click', function() {
		$('.wc_size_variatation').removeClass('wc_size_variatation_selected');
		$(this).parent('.wc_size_variatation').addClass('wc_size_variatation_selected');
		let product_id = $(this).attr('data-product_id');
		let grandparent_id = $(this).attr('data-grand-parent');
		//console.log('.iron_btn_confirm_selection_' + product_id + '_' + grandparent_id);
		$('.iron_btn_confirm_selection_' + product_id + '_' + grandparent_id).trigger('click');
	});
	
	// Confirm selection button (hidden)
	$('.iron_btn_confirm_selection').on('click', function() {
		var action = $(this).attr("data-action");
		var ppid = $(this).attr("data-parent");
		var gppid = $(this).attr("data-grand-parent");
		var targetppbox = $('#wc_size_variatation_' + ppid + '_' + gppid).children().children().children();
		var targethiddenv = $('.wc_size_variatation_' + ppid + '_' + gppid).children().children().children();
		
		if(action == "confirm") {
			// $(this).prop('disabled', true);
			var product_id = $(targetppbox).children('.wc_size_variatation_selected a').attr('data-product_id');
			var gproduct_id = $(targetppbox).children('.wc_size_variatation_selected a').attr('data-grand-parent');
			var variation_id = $(targetppbox).children('.wc_size_variatation_selected a').attr('data-variation_id');
			var variation_price = parseFloat($(targetppbox).children('.wc_size_variatation_selected a').attr('data-product_sku'));
			var variation_attributes_name = $('.iron_variation_attributes_' + variation_id + '_' +
				gproduct_id).attr('name');
			var variation_attributes_val = $('.iron_variation_attributes_' + variation_id + '_' +
				gproduct_id).val();
			var variable_target = product_id + '|' + variation_id + '|' + variation_attributes_name + ':' +
				variation_attributes_val;
			var variation_id_if = $(this).parent().children('.variation_cart_item').attr('id');
			var subbtt = parseFloat($("#wc_iron_subttl").val());
			var grp_prod_id = $('#wc_iron_prod_id').val();
			
			if(variation_id_if) {
				var removeprz = parseFloat($(this).parent().children('.variation_cart_item').attr('cart_variation_price'));
				var removeprd = $(this).parent().children('.variation_cart_item').attr('cart_variation_item');
				var removeprdid = $(this).parent().children('.variation_cart_item').attr('id');
				var targetid = (removeprd + ',');
				grp_prod_id = grp_prod_id.replace(targetid, '');
				console.log('311 ' + subbtt + ' - ' + removeprz);
				var subbtt = parseFloat(subbtt) - parseFloat(removeprz);
				console.log('303 ' + subbtt);
				/* $(this).closest('.variation_cart_item').attr('cart_variation_price','');
				$(this).closest('.variation_cart_item').attr('cart_variation_item','');
				$(this).closest('.variation_cart_item').attr('id','');
				 */
			}
			
			$(this).parent().children('.variation_cart_item').attr('cart_variation_price', variation_price);
			$(this).parent().children('.variation_cart_item').attr('cart_variation_item', variable_target);
			$(this).parent().children('.variation_cart_item').attr('id', variation_id);
			
			$('.wc_access_rmv_btn_' + ppid).attr('data-product_sku', variation_price);
			$('.wc_access_rmv_btn_' + ppid).attr('data-product_id', variable_target);
			console.log('variation_price: ' + variation_price);
			let ttprice = parseFloat(variation_price) + parseFloat(subbtt);
			console.log('total_price: ' + ttprice.toFixed(0));
			$(".wc_iron_total").text('$' + ttprice.toFixed(0) + ' CAD');
			$("#wc_iron_subttl").val(ttprice.toFixed(0));
			
			grp_prod_id = variable_target + ',' + grp_prod_id;
			console.log('group_prod_id: ');
			console.log(grp_prod_id);
			$('#wc_iron_prod_id').val(grp_prod_id);
			$(".wc_access_rmv_btn_" + ppid).show();
			$('.wc_access_select_option_btn_' + ppid).hide();
		}
	});
	
	// Remove button
	$('.wc_access_rmv_btn_varaiable').click(function() {
		var product_id = $(this).attr("data-product_id");
		var hideboxid = $(this).attr("data-parent-product");
		var remove_prodtid = $(this).attr("data-remove_prodtid");
		var $this = '#wc_size_variatation_' + remove_prodtid + '_' + hideboxid;
		var grp_prod_id = $('#wc_iron_prod_id').val();
		var prodprc = parseFloat($(this).attr("data-product_sku"));
		var subbtt = parseFloat($("#wc_iron_subttl").val());
		
		var targetid = (product_id + ',');
		grp_prod_id = grp_prod_id.replace(targetid, '');
		console.log('352 ' + subbtt + ' - ' + prodprc);
		var ttprice = parseFloat(subbtt) - parseFloat(prodprc);
		console.log('7 354 ' + ttprice.toFixed(0));
		$(".wc_iron_total").text('$' + ttprice.toFixed(0) + ' CAD');
		$("#wc_iron_subttl").val(ttprice.toFixed(0));
		$('#wc_iron_prod_id').val(grp_prod_id);
		
		$($this).children().children().children('.wc_size_variatation').removeClass('wc_size_variatation_selected');
		var variation_cart_item = '.wc_size_variatation_' + remove_prodtid + '_' + hideboxid;
		console.log('361 ' + variation_cart_item);
		$(variation_cart_item).children('.wc_addone_btn_' + remove_prodtid).children('.variation_cart_item').attr('cart_variation_price', '');
		$(variation_cart_item).children('.wc_addone_btn_' + remove_prodtid).children('.variation_cart_item').attr('cart_variation_item', '');
		$(variation_cart_item).children('.wc_addone_btn_' + remove_prodtid).children('.variation_cart_item').attr('id', '');
		
		$($this).hide();
		$(this).parent(".accessory-cart").children(".wc_access_select_option_btn").show();
		$(this).attr("data-product_id", hideboxid);
		$(this).attr("data-product_sku", '');
		$(this).hide();
	});
});

// unused function
function mjt_product_table_script(grp_prod_idd) {
	//console.log(grp_prod_idd); console.log(wc_iron_place_order_obj.ajaxurl);
	jQuery.ajax({
		url: wc_iron_place_order_obj.ajaxurl,
		type: 'post',
		data: {
			action: 'mjt_woocommerce_ajax_product_table',
			post_id: grp_prod_idd
		},
		beforeSend: function(response) {
			jQuery('.iron_waiting').removeClass('iron_hide_waiting').addClass('iron_show_waiting');
		},
		complete: function(response) {
			jQuery('.iron_waiting').removeClass('iron_show_waiting').addClass('iron_hide_waiting');
		},
		success: function(data) {
			jQuery("#orderinquiry").show();
			jQuery(".iron_product_table").html(data);
		},
		error: function(errorThrown) {
			// alert(errorThrown);
			console.log(errorThrown);
			//alert('An error occured. Please try again');
		}
	});
}

// Get the modal
var modal = document.getElementById("orderinquiry");
var modalInquiryCart = document.getElementById("cartinquiry");

// Get the button that opens the modal
var btn = document.getElementById("iron_inquiry_btn");
var btnInquiryCart = document.querySelector(".xoo-wsc-ft-btn-inquiry");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
var closeInquiryCart = document.querySelector(".close-modal-cart");

if(btn) {
	// When the user clicks on the button, open the modal
	jQuery(btn).on('click', function() {
		var grp_prod_id = jQuery('#wc_iron_prod_id').val();
		var grp_prod_idd = grp_prod_id.substring(0, grp_prod_id.length - 1);
		var custmeremainid = jQuery('#email_id_order_form_end').val();
    jQuery('body').addClass('scroll-stop');
		// var htmtable = mjt_product_table_script(grp_prod_idd);
		
		/* if(custmeremainid == '') { 
			jQuery('#email_id_order_form_end').css('border-color', 'red');
			return false;
		} else {
			var ttrue = ValidateEmail(custmeremainid);
			
			if(ttrue == true) { */
				modal.style.display = "block";
				jQuery('#wc_hidden_checkput_products').val(grp_prod_idd);
				jQuery('#iron_submit_products').val(grp_prod_idd);
				jQuery('.iron_email').val(custmeremainid);
				jQuery('.wc_iron_subtotal').hide();
			// }
		// }
	});
}

if(btnInquiryCart) {
	// When the user clicks on the button, open the modal
	jQuery('body').on('click','.xoo-wsc-ft-btn-inquiry', function(e) {	
    e.preventDefault();
    jQuery('body').addClass('scroll-stop');
    jQuery('.modal-cart').addClass('d-flex');
    jQuery('.modal-cart .iron_email').val(jQuery('#xoo-iron_email').val());

	});
}


// When the user clicks on <span> (x), close the modal
/*
jQuery('body').on('click', '.close-modal-cart', function() {	
  jQuery('.modal-cart').removeClass('d-flex');
  jQuery('body').removeClass('scroll-stop');
});

jQuery(span).on('click', function() {
	modal.style.display = "none";
	jQuery('.wc_iron_subtotal').show();
});
*/
/*
// When the user clicks anywhere outside of the modal, close it
jQuery(window).on('click', function(e) {
	if(e.target == modal) {
		modal.style.display = "none";
		jQuery('.wc_iron_subtotal').show();
	}
});
*/
function ValidateEmail(mail) {
	if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
		return (true);
	
	alert("You have entered an invalid email address!");
	return (false);
}

function alphanumeric(inputtxt) {
	var letterNumber = /^[0-9a-zA-Z]+$/;
	
	if((inputtxt.value.match(letterNumber))) {
		return true;
	} else {
		// alert("message");
		return false;
	}
}

jQuery(document).ready(function($) {
	'use strict';
	
	$(".allow-numeric").bind("keypress", function (e) {
        var keyCode = e.which ? e.which : e.keyCode;
		
        if(!(keyCode >= 48 && keyCode <= 57)) {
            $(".error").css("display", "inline");
            return false;
        } else {
			$(".error").css("display", "none");
        }
    });
    //console.log(wc_iron_place_order_obj.ajaxurl);
	/**
	 * Submit inquiry button (modal)
	 */
	$('.iron-submit').on('click', function() {
		let email = $('.iron_email').val();
		//console.log('ajax--'+wc_iron_place_order_obj.ajaxurl);
		if(email !== '') {
			let ttrue = ValidateEmail(email);
			
			if(ttrue == true) {
				let name = $('.iron_text_name').val();
				let lname = $('.iron_text_lname').val()
				let phone = $('.iron_text_phone').val();
				let zipc = $('.iron_text_zipcode').val();
				let message = $('.iron_text_message').val();
				let grp_prod_id = $('#wc_iron_prod_id').val();
				let iron_order_page = $('#iron_order_page').val();
				let post_ids = grp_prod_id ? grp_prod_id.substring(0, grp_prod_id.length - 1) : 0;


				
				let request = $.ajax({
					url: wc_iron_place_order_obj.ajaxurl,
					type: 'post',
					data: {
						action: 'iron_submit_inquery_form_script',
						post_id: post_ids,
						name: name,
						lname: lname,
						email: email,
						phone: phone,
						zip_code: zipc,
						iron_order_page: iron_order_page,
						message: message,
						deal: {
							stage: 'new_lead'
						}
					},
					beforeSend: function(response) {
						//$('.iron_waiting').removeClass('iron_hide_waiting').addClass('iron_show_waiting');
					},
					complete: function(response) {
						//$('.iron_waiting').removeClass('iron_show_waiting').addClass('iron_hide_waiting');
					},
					success: function(response) {
						// var actionurl = "http://gator4118.temp.domains/~ironeers/thank-you-custom-design-projects/";
						console.log(response);
					},
					error: function(errorThrown) {
						/*alert(errorThrown); */
						console.log(errorThrown);
						//alert('An error occured. Please try again');
					}
				});
				request.done(function(response) {
					let actionurl = response;
					//alert(msgg);
					$('#orderinquiry').hide();
					$('.wc_iron_subtotal').show();
					//var actionurl = $('#thank_you_page_url').val();
					window.location.href = actionurl;
				});
			} else {
				$(".errormail").css("display", "block");
			}
		}
	});
	
	/**
	 * Checkout button (modal)
	 */

  /* Netstellar blocking script

	$('.wc_iron_place_order_btn').on('click', function(e) {
		e.preventDefault();
		let email = $('.iron_email').val();
		
		if(email !== '') {
			let ttrue = ValidateEmail(email);
			
			if(ttrue == true) {
        console.log('mail-true');
				let name = $('.iron_text_name').val();
				let lname = $('.iron_text_lname').val()
				let phone = $('.iron_text_phone').val();
				let zipc = $('.iron_text_zipcode').val();
				let message = $('.iron_text_message').val();
				let grp_prod_id = $('#wc_iron_prod_id').val();
				let iron_order_page = $('#iron_order_page').val();
				let post_ids = grp_prod_id ? grp_prod_id.substring(0, grp_prod_id.length - 1) : 0;
				
				let request = $.ajax({
					url : wc_iron_place_order_obj.ajaxurl,
					type : 'post',
					data : {
						action : 'iron_submit_inquery_form_script',
						post_id : post_ids,
						name : name,
						lname : lname,
						email : email,
						phone : phone,
						zip_code : zipc,
						iron_order_page : iron_order_page,
						message : message,
						deal: {
							stage: 'checkout_abandoned'
						}
					},
					beforeSend: function (response) {
						$('.iron_waiting').removeClass('iron_hide_waiting').addClass('iron_show_waiting');
					},
					complete: function (response) {
						$('.iron_waiting').removeClass('iron_show_waiting').addClass('iron_hide_waiting');
					},
					success: function(response) {
						// var actionurl = "http://gator4118.temp.domains/~ironeers/thank-you-custom-design-projects/ " ;
						console.log(response);
					},
					error: function(errorThrown){
					
						console.log(errorThrown);
						alert('An error occured. Please try again');
					}
				});
				request.done(function(response) {
					$('#orderinquiry').hide();
					$('.wc_iron_subtotal').show();
				});
			} else {
				$(".errormail").css("display", "block");
			}
		}
	});
	*/
  function setCookie(name, value, options = {}) {

    options = {
      path: '/',
      // при необходимости добавьте другие значения по умолчанию
      ...options
    };
  
    if (options.expires instanceof Date) {
      options.expires = options.expires.toUTCString();
    }
  
    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
  
    for (let optionKey in options) {
      updatedCookie += "; " + optionKey;
      let optionValue = options[optionKey];
      if (optionValue !== true) {
        updatedCookie += "=" + optionValue;
      }
    }
  
    document.cookie = updatedCookie;
  }

	/**
	 * Checkout button (side cart)
	 */
	$('body').on('click', '.xoo-wsc-ft-btn-checkout', function(e) {
		//e.preventDefault();
		let email = $('.xoo-iron-email').val();

    setCookie('user_email', email, {secure: true, 'max-age': 3600});
		console.log('email-'+email);
		if(email !== '') {
			let iron_order_page = $('#iron_order_page').val();

			
			$.ajax({
				url: wc_iron_place_order_obj.ajaxurl,
				type: 'post',
				data: {
					action: 'iron_submit_inquery_form_script',
					email: email,
					iron_order_page: iron_order_page,
					deal: {
						stage: 'checkout_abandoned'
					}
				},
				success: function(response) {
					console.log(response);
				},
				error: function(errorThrown) {
					console.log(errorThrown);
					//alert('An error occured. Please try again');
				}
			});
		}
	});
	
	/**
	 * Submit inquiry button (side cart)
	 */
	$('body').on('click', '.inquiry-btn', function() {

		let email = $('#sidecart-email-input').val();		
		if(email !== '') {
			let iron_order_page = $('#iron_order_page').val();
			
			$.ajax({
				url: wc_iron_place_order_obj.ajaxurl,
				type: 'post',
				data: {
					action: 'iron_submit_inquery_form_script',
					email: email,
					iron_order_page: iron_order_page,
					deal: {
						stage: 'inquiry_abandoned'
					}
				},
				success: function(response) {
					console.log(response);
				},
				error: function(errorThrown) {
					console.log(errorThrown);
					//alert('An error occured. Please try again');
				}
			});
			
			/* Update the subtotal on the inquiry form */
			let total = $('.xoo-wsc-ft-amt-subtotal .woocommerce-Price-amount').text();
			$('.iron_checkout_btn .wc_iron_total').text(total + ' CAD');
		}
	});

  /**
	 * Submit inquiry button (new side cart modal) // Netstellar 2
	 */
   $('body').on('click', '.iron-cart-formSubmit', function() {

		let email = $('#cartinquiry .iron_email').val();	
		
		if(email !== '') {
			let ttrue = ValidateEmail(email);
			console.log('ajax-send');
			if(ttrue == true) {
				let name    = $('#cartinquiry .iron_text_name').val();
				let lname   = $('#cartinquiry .iron_text_lname').val()
				let phone   = $('#cartinquiry .iron_text_phone').val();
				let zipc    = $('#cartinquiry .iron_text_zipcode').val();
				let message = $('#cartinquiry .iron_text_message').val();
							
				let request = $.ajax({
					url: wc_iron_place_order_obj.ajaxurl,
					type: 'post',
					data: {
						action: 'iron_submit_inquery_form_script',
						//post_id: post_ids,
						name: name,
						lname: lname,
						email: email,
						phone: phone,
						zip_code: zipc,
						iron_order_page: 'cart',
						message: message,
						deal: {
							stage: 'new_lead'
						}
					},
					beforeSend: function(response) {
						//$('.iron_waiting').removeClass('iron_hide_waiting').addClass('iron_show_waiting');
					},
					complete: function(response) {
						//$('.iron_waiting').removeClass('iron_show_waiting').addClass('iron_hide_waiting');
					},
					success: function(response) {
						// var actionurl = "http://gator4118.temp.domains/~ironeers/thank-you-custom-design-projects/";
						console.log('resp-'+response);
					},
					error: function(errorThrown) {
						/*alert(errorThrown); */
						console.log(errorThrown);
						//alert('An error occured. Please try again');
					}
				});
				request.done(function(response) {
					let actionurl = response;
					//alert(msgg);
					$('#cartinquiry').hide();
					//$('.wc_iron_subtotal').show();
					//var actionurl = $('#thank_you_page_url').val();
					window.location.href = actionurl;
				});
			} else {
				$(".errormail").css("display", "block");
			}
		}
	});

  /**
	 * Close inquiry form (new side cart modal) // Netstellar 2
	 */
   $('body').on('click', '#cartinquiry .close-modal-cart', function() {

		let email = $('#cartinquiry .iron_email').val();	
		
		if(email !== '') {
			let ttrue = ValidateEmail(email);
			
			if(ttrue == true) {
				let name    = $('#cartinquiry .iron_text_name').val();
				let lname   = $('#cartinquiry .iron_text_lname').val()
				let phone   = $('#cartinquiry .iron_text_phone').val();
				let zipc    = $('#cartinquiry .iron_text_zipcode').val();
				let message = $('#cartinquiry .iron_text_message').val();
							
				let request = $.ajax({
					url: wc_iron_place_order_obj.ajaxurl,
					type: 'post',
					data: {
						action: 'iron_submit_inquery_form_script',
						//post_id: post_ids,
						name: name,
						lname: lname,
						email: email,
						phone: phone,
						zip_code: zipc,
						iron_order_page: 0,
						message: message,
						deal: {
							stage: 'inquiry_abandoned'
						}
					},
					beforeSend: function(response) {
            jQuery('.modal-cart').removeClass('d-flex');
            jQuery('body').removeClass('scroll-stop');
					},
					complete: function(response) {
						
					},
					success: function(response) {
						
					},
					error: function(errorThrown) {						
						console.log(errorThrown);
						//alert('An error occured. Please try again');
					}
				});
				request.done(function(response) {
					let actionurl = response;
					
					$('#cartinquiry').hide();
					//$('.wc_iron_subtotal').show();
					//var actionurl = $('#thank_you_page_url').val();
					//window.location.href = actionurl;
				});
			} else {
				$(".errormail").css("display", "block");
			}
		}
	});

  /**
	 * Close inquiry form (order page modal) // Netstellar 2
	 */
   $('body').on('click', '#orderinquiry .close', function() {

		let email = $('#orderinquiry .iron_email').val();	
		
		if(email !== '') {
			let ttrue = ValidateEmail(email);
			
			if(ttrue == true) {
				let name    = $('#orderinquiry .iron_text_name').val();
				let lname   = $('#orderinquiry .iron_text_lname').val()
				let phone   = $('#orderinquiry .iron_text_phone').val();
				let zipc    = $('#orderinquiry .iron_text_zipcode').val();
				let message = $('#orderinquiry .iron_text_message').val();
        let grp_prod_id = $('#wc_iron_prod_id').val();
				let iron_order_page = $('#iron_order_page').val();
				let post_ids = grp_prod_id ? grp_prod_id.substring(0, grp_prod_id.length - 1) : 0;
							
				let request = $.ajax({
					url: wc_iron_place_order_obj.ajaxurl,
					type: 'post',
					data: {
						action: 'iron_submit_inquery_form_script',
						post_id: post_ids,
						name: name,
						lname: lname,
						email: email,
						phone: phone,
						zip_code: zipc,
						iron_order_page: iron_order_page,
						message: message,
						deal: {
							stage: 'inquiry_abandoned'
						}
					},
					beforeSend: function(response) {
            $('#orderinquiry').hide();
            jQuery('.wc_iron_subtotal').show();
					},
					complete: function(response) {
						
					},
					success: function(response) {
						
					},
					error: function(errorThrown) {						
						console.log(errorThrown);
						//alert('An error occured. Please try again');
					}
				});
				request.done(function(response) {
					let actionurl = response;
					
					$('#orderinquiry').hide();
          jQuery('body').removeClass('scroll-stop');
					//$('.wc_iron_subtotal').show();
					//var actionurl = $('#thank_you_page_url').val();
					//window.location.href = actionurl;
				});
			} else {
				$(".errormail").css("display", "block");
			}
		} else {
      $('#orderinquiry').hide();
      jQuery('body').removeClass('scroll-stop');
      jQuery('.wc_iron_subtotal').show();
    }

	});

  /**
	 * Load ATC button spinner  // Netstellar 2
	 */
  jQuery('body').on('click', '.runing-button', function() {
    //console.log('runing');
      $(this).addClass('runing');
    setTimeout(function() {
      $(this).prop('disabled', true)
    }, 500);
  });
  

});

	


function cartValidateEmail(input) {
  var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (input.match(validRegex)) {
    //alert("Valid email address!");
    document.getElementById('xoo-iron_email').focus();
    document.querySelector('.cart-buttons-disabled').classList.add('index-minus');
    document.querySelector('.xoo-wsc-ft-buttons-cont').classList.remove('buttons-disabled');
    return true;

  } else {

    //alert("Invalid email address!");
    //document.form1.text1.focus();
    document.getElementById('xoo-iron_email').focus();
    document.querySelector('.cart-buttons-disabled').classList.remove('index-minus');
    document.querySelector('.xoo-wsc-ft-buttons-cont').classList.add('buttons-disabled');
    return false;

  }

}

function cartEmailValidate() {
var cart_email = document.getElementById('xoo-iron_email');


cart_email.addEventListener('input', function (event) {
  // Каждый раз, когда пользователь что-то вводит,
  // мы проверяем, являются ли поля формы валидными
  console.log('t');
  if (cart_email.validity.valid) {
    // Если на момент валидации какое-то сообщение об ошибке уже отображается,
    // если поле валидно, удаляем сообщение
    //emailError.textContent = ''; // Сбросить содержимое сообщения
    //emailError.className = 'error'; // Сбросить визуальное состояние сообщения
    console.log('valid');
  } else {
    // Если поле не валидно, показываем правильную ошибку
    showError();
  }
});

}

function showError() {
  if(cart_email.validity.valueMissing) {
    // Если поле пустое,
    // отображаем следующее сообщение об ошибке
    //emailError.textContent = 'You need to enter an e-mail address.';
  } else if(cart_email.validity.typeMismatch) {
    // Если поле содержит не email-адрес,
    // отображаем следующее сообщение об ошибке
    //emailError.textContent = 'Entered value needs to be an e-mail address.';
  } else if(cart_email.validity.tooShort) {
    // Если содержимое слишком короткое,
    // отображаем следующее сообщение об ошибке
    //emailError.textContent = `Email should be at least ${ cart_email.minLength } characters; you entered ${ cart_email.value.length }.`;
  }

  // Задаём соответствующую стилизацию
  //emailError.className = 'error active';
}
