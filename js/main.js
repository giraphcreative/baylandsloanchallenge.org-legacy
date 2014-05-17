!function(a,b){a.extend(a.fn,{accrue:function(b){return b=a.extend({calculationMethod:d},a.fn.accrue.options,b),this.each(function(){var g=a(this);g.find(".form").length||g.append('<div class="form"></div>');c(g,b,"amount"),c(g,b,"rate"),c(g,b,"term");if("compare"==b.mode){c(g,b,"rate_compare")}if(".results"===b.response_output_div){0==g.find(".results").length&&g.append('<div class="results"></div>');var h=g.find(".results")}else var h=a(b.response_output_div);switch(b.mode){case"basic":var i=d;break;case"compare":var i=e;break;case"amortization":var i=f}i(g,b,h),"button"==b.operation?(0==g.find("button").length&&g.find(".form").append('<button class="accrue-calculate">'+b.button_label+"</button>"),g.find("button, input[type=submit]").each(function(){a(this).click(function(a){a.preventDefault(),i(g,b,h)})})):g.find("input, select").each(function(){a(this).bind("keyup change",function(){i(g,b,h)})}),g.find("form").each(function(){a(this).submit(function(a){a.preventDefault(),i(g,b,h)})})})}}),a.fn.accrue.options={mode:"basic",operation:"keyup",default_values:{amount:"$7,500",rate:"7%",rate_compare:"1.49%",term:"36m"},field_titles:{amount:"Loan Amount",rate:"Rate (APR)",rate_compare:"Comparison Rate",term:"Term"},button_label:"Calculate",field_comments:{amount:"",rate:"",rate_compare:"",term:"Format: 12m, 36m, 3y, 7y"},response_output_div:".results",response_basic:"<p><strong>Monthly Payment:</strong><br />$%payment_amount%</p><p><strong>Number of Payments:</strong><br />%num_payments%</p><p><strong>Total Payments:</strong><br />$%total_payments%</p><p><strong>Total Interest:</strong><br />$%total_interest%</p>",response_compare:"Save $%savings% in interest!",error_text:"Please fill in all fields.",callback:function(){}};var c=function(a,b,c){var d=a.find("."+c).length?a.find("."+c):a.find(".accrue-"+c).length?a.find(".accrue-"+c):a.find("input[name~="+c+"]").length?a.find("input[name~="+c+"]"):"";return"string"!=typeof d?d.val():"term_compare"==c?!1:(a.find(".form").append('<div class="accrue-field-'+c+'"><p><label>'+b.field_titles[c]+':</label><input type="text" class="'+c+'" value="'+b.default_values[c]+'" />'+(b.field_comments[c].length>0?"<small>"+b.field_comments[c]+"</small>":"")+"</p></div>"),a.find("."+c).val())},d=function(b,d,e){var f=a.loanInfo({amount:c(b,d,"amount"),rate:c(b,d,"rate"),term:c(b,d,"term")});if(0!==f){var g=d.response_basic.replace("%payment_amount%",f.payment_amount_formatted).replace("%num_payments%",f.num_payments).replace("%total_payments%",f.total_payments_formatted).replace("%total_interest%",f.total_interest_formatted);e.html(g)}else e.html('<p class="error">'+d.error_text+"</p>");d.callback(b,f)},e=function(b,d,e){var f=c(b,d,"term_compare");f===!1&&(f=c(b,d,"term"));var g=a.loanInfo({amount:c(b,d,"amount"),rate:c(b,d,"rate"),term:c(b,d,"term")}),h=a.loanInfo({amount:c(b,d,"amount"),rate:c(b,d,"rate_compare"),term:f}),i={loan_1:g,loan_2:h};if(0!==g&&0!==h){i.savings=g.total_interest-h.total_interest>0?g.total_interest-h.total_interest:0;var j=d.response_compare.replace("%savings%",i.savings.toFixed(2)).replace("%a_payment_amount%",h.payment_amount_formatted).replace("%a_num_payments%",h.num_payments).replace("%a_total_payments%",h.total_payments_formatted).replace("%a_total_interest%",h.total_interest_formatted).replace("%b_payment_amount%",g.payment_amount_formatted).replace("%b_num_payments%",g.num_payments).replace("%b_total_payments%",g.total_payments_formatted).replace("%b_total_interest%",g.total_interest_formatted);e.html('<p class="total-savings">'+j+"</p>")}else e.html('<p class="error">'+d.error_text+"</p>");d.callback(b,i)},f=function(b,d,e){var f=a.loanInfo({amount:c(b,d,"amount"),rate:c(b,d,"rate"),term:c(b,d,"term")});if(0!==f){var g='<table class="accrue-amortization"><tr><th class="accrue-payment-number">#</th><th class="accrue-payment-amount">Payment Amt.</th><th class="accrue-total-interest">Total Interest</th><th class="accrue-total-payments">Total Payments</th><th class="accrue-balance">Balance</th></tr>',h=f.payment_amount-f.original_amount/f.num_payments,i=f.payment_amount-h;counter_interest=0,counter_payment=0,counter_balance=parseInt(f.original_amount);for(var j=0;j<f.num_payments;j++){counter_interest+=h,counter_payment+=f.payment_amount,counter_balance-=i;var k="td";j==f.num_payments-1&&(k="th"),g=g+"<tr><"+k+' class="accrue-payment-number">'+(j+1)+"</"+k+"><"+k+' class="accrue-payment-amount">$'+f.payment_amount_formatted+"</"+k+"><"+k+' class="accrue-total-interest">$'+counter_interest.toFixed(2)+"</"+k+"><"+k+' class="accrue-total-payments">$'+counter_payment.toFixed(2)+"</"+k+"><"+k+' class="accrue-balance">$'+counter_balance.toFixed(2)+"</"+k+"></tr>"}g+="</table>",e.html(g)}else e.html('<p class="error">'+d.error_text+"</p>");d.callback(b,f)};a.loanInfo=function(a){var b=("undefined"!=typeof a.amount?a.amount:0).replace(/[^\d.]/gi,""),c=("undefined"!=typeof a.rate?a.rate:0).replace(/[^\d.]/gi,""),d="undefined"!=typeof a.term?a.term:0;d=d.match("y")?12*parseInt(d.replace(/[^\d.]/gi,"")):parseInt(d.replace(/[^\d.]/gi,""));var e=c/1200,f=b*(e/(1-Math.pow(1+e,-1*d)));return b*c*d>0?{original_amount:b,payment_amount:f,payment_amount_formatted:f.toFixed(2),num_payments:d,total_payments:f*d,total_payments_formatted:(f*d).toFixed(2),total_interest:f*d-b,total_interest_formatted:(f*d-b).toFixed(2)}:0}}(jQuery,window,document),$(function(){var a=function(){var a=parseFloat("undefined"!=typeof $(".result.credit").html()?$(".result.credit").html():0)+parseFloat("undefined"!=typeof $(".result.loan-auto").html()?$(".result.loan-auto").html():0)+parseFloat("undefined"!=typeof $(".result.loan-personal").html()?$(".result.loan-personal").html():0);$(".result.total").html(a>0?"Congratulations!<br />You can save $"+a.toFixed(2)+" in interest!":"See your loan<br>savings here:")};$(".calculator.credit").accrue({mode:"compare",response_output_div:".result.credit",response_compare:"$%savings%",error_text:"$0",callback:function(b,c){0!==c&&a()}}),$(".calculator.loan-auto").accrue({mode:"compare",response_output_div:".result.loan-auto",response_compare:"$%savings%",error_text:"$0",callback:function(b,c){0!==c&&a()}}),$(".calculator.loan-personal").accrue({mode:"compare",response_output_div:".result.loan-personal",response_compare:"$%savings%",error_text:"$0",callback:function(b,c){0!==c&&a()}}),$(".numbers-only").keyup(function(){var a=$(this).val().replace(/[^0-9.]/g,"");$(this).val(a)})});