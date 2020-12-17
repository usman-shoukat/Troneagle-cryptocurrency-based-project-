var CONTRACT_ADDRESS="TLYbVnQNzCXCdrRw53nMBE69noueELvZ2h";window.troni={}
var DateHelper={time_ago_in_words_with_parsing:function(from){var date=new Date;date.setTime(Date.parse(from));return this.time_ago_in_words(date);},time_ago_in_words:function(from,fixed=true){return this.distance_of_time_in_words(new Date,from,fixed);},distance_of_time_in_words:function(to,from,fixed=true){var distance_in_seconds=((to-from)/1000);var distance_in_minutes=Math.floor(distance_in_seconds/60);var tense=distance_in_seconds<0?"":" ago";distance_in_minutes=Math.abs(distance_in_minutes);if(distance_in_minutes==0){return 'less than a minute'+tense;}
if(distance_in_minutes==1){return 'a minute'+tense;}
if(distance_in_minutes<45){return distance_in_minutes+' minutes'+tense;}
if(distance_in_minutes<90){return 'about an hour'+tense;}
if(distance_in_minutes<1440){return 'about '+Math.floor(distance_in_minutes/60)+' hours'+tense;}
if(distance_in_minutes<2880){return 'a day'+tense;}
if(fixed==false){if(distance_in_minutes<48000){return Math.floor(distance_in_minutes/1440)+' days'+tense;}
if(distance_in_minutes<86400){return 'about a month'+tense;}
if(distance_in_minutes<525960){return Math.floor(distance_in_minutes/43200)+' months'+tense;}
if(distance_in_minutes<1051199){return 'about a year'+tense;}
return 'over '+Math.floor(distance_in_minutes/525960)+' years';}else{if(distance_in_minutes<86400){return Math.floor(distance_in_minutes/1440)+' days'+tense;}
return '∞';}}};function roundToFour(num){return+(Math.floor(num+"e+4")+"e-4");}
function roundToTwo(num){return+(Math.floor(num+"e+2")+"e-2");}
function num(val){return roundToFour(window.tronWeb.toDecimal(val)/1000000);}
function getUrlVars(){var vars={};var parts=window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(m,key,value){vars[key]=value;});return vars;}
function load_contract_details(){window.troni.contract.contractInfo().call().then(function(response){document.querySelectorAll("*[data-update='global_total_invested']").forEach(function(e){e.innerHTML=roundToTwo(window.tronWeb.toDecimal(response._total_invested)/1000000);})
document.querySelectorAll("*[data-update='global_total_investors']").forEach(function(e){e.innerHTML=window.tronWeb.toDecimal(response._total_investors);})
document.querySelectorAll("*[data-update='global_total_referral_bonus']").forEach(function(e){e.innerHTML=roundToTwo(window.tronWeb.toDecimal(response._total_referral_bonus)/1000000);})
document.querySelectorAll("*[data-update='global_total_withdrawn']").forEach(function(e){e.innerHTML=roundToTwo(window.tronWeb.toDecimal(response._total_withdrawn)/1000000);})}).catch(function(err){swal("Error",err,"error")})}
function load_account_details(){if(window.troni.address!=undefined&&window.troni.address!=null){window.troni.contract.userInfo(window.troni.address).call().then(function(response){for(var i=0;i<response.referrals.length;i++){document.querySelectorAll("*[data-update='lvl"+(i+1)+"']").forEach(function(e){e.innerHTML=roundToFour(window.tronWeb.toDecimal(response.referrals[i]));})}
document.querySelectorAll("*[data-update='total_withdrawable']").forEach(function(e){e.innerHTML=roundToFour(window.tronWeb.toDecimal(response.for_withdraw)/1000000);})
document.querySelectorAll("*[data-update='total_referral_withdrawable']").forEach(function(e){e.innerHTML=roundToFour(window.tronWeb.toDecimal(response.withdrawable_referral_bonus)/1000000);})
document.querySelectorAll("*[data-update='total_invested']").forEach(function(e){e.innerHTML=roundToFour(window.tronWeb.toDecimal(response.invested)/1000000);})
document.querySelectorAll("*[data-update='total_withdrawn']").forEach(function(e){e.innerHTML=roundToFour(window.tronWeb.toDecimal(response.withdrawn)/1000000);})
document.querySelectorAll("*[data-update='total_referral_bonus']").forEach(function(e){e.innerHTML=roundToFour(window.tronWeb.toDecimal(response.referral_bonus)/1000000);})}).catch(function(err){swal("Error",err,"error")})}}
function load_account_balance(){if(window.troni.address!=undefined&&window.troni.address!=null){window.tronWeb.trx.getAccount(window.troni.address).then(function(response){document.getElementById("your_balance").innerHTML=roundToFour(response.balance/1000000)}).catch(function(err){swal("Error",err,"error")})}}
function load_account_payments(){if(window.troni.address!=undefined&&window.troni.address!=null){window.troni.contract.investmentsInfo(window.troni.address).call().then(function(response){var table=document.getElementById("your_investments")
if(response.amounts.length>0){table.innerHTML="";var c=0;for(var i=(response.amounts.length-1);i>=0;i--){var left=new Date(window.tronWeb.toDecimal(response.endTimes[i]._hex)*1000);table.innerHTML+="<div class='card shadow-sm mb-3' style='background-color:rgba(255,255,255,0.7)'><div class='card-body p-2 pl-3 pr-3'>"+
'<h3 class="mb-0">'+
num(response.amounts[i])+' <small>TRX</small>'+
(left>new Date()?'<span class="float-right text-right" style="margin-top:-4px"><small style="font-size:12px">Time left</small><br>'+DateHelper.time_ago_in_words(left)+'</span>':'<span class="float-right text-info">Finished</span>')+
'</h3>'+
'<p class="lead mb-0">'+num(response.totalWithdraws[i]._hex)+' <small class="text-muted">TRX withdrawn</small> ('+roundToTwo(num(response.totalWithdraws[i]._hex)/(num(response.amounts[i]._hex)/100))+'%)</p>'+
"</div></div>";c+=1;}
if(response.amounts.length>8){table.innerHTML+="<tr class='showall'><td class='p-0' colspan='4'><a href='#load_all_payments' onclick='document.querySelectorAll(\"#account_payments tr\").forEach(function(item){ item.style.display=\"table-row\" }); document.querySelector(\"#account_payments .showall\").remove()' class='btn btn-outline-secondary btn-block btn-sm'>Load all past deposits</a></td></tr>";}}}).catch(function(err){swal("Error",err,"error")})}}
function deposit(value){var ref=window.referral;if(ref==undefined||ref==null){ref=localStorage.unicorn_referral}
if(ref==undefined||ref==null){ref='TP5K8QeQjvxwr6bRo5XV1JfyZqPQBsyP5c'}
window.troni.contract.deposit(ref).send({callValue:value*1000000}).then(function(response){swal("Deposited!","You deposited "+value+" TRX","success");window.setTimeout(function(){load_account_payments();load_account_balance();load_account_details()},500);window.setTimeout(function(){load_account_payments()},3000);}).catch(function(err){console.log(err);swal("Error",""+err+"","error")})}
document.addEventListener('DOMContentLoaded',function(){$("#excalc").on('keyup keydown',function(){var invest=parseFloat($(this).val());$('[data-excalc="30d"]').html(parseInt((invest/100*6.66)*30)+" TRX")
$('[data-excalc="90d"]').html(parseInt((invest/100*6.66)*90)+" TRX")
$('[data-excalc="365d"]').html(parseInt((invest/100*6.66)*365)+" TRX")})
window.referral="TP5K8QeQjvxwr6bRo5XV1JfyZqPQBsyP5c"
var r=getUrlVars()["ref"]
if(r!=undefined&&r!=null){window.referral=r.split("#")[0];if(localStorage!=undefined){localStorage.unicorn_referral=window.referral}
console.log("Referral: "+window.referral)}else if(localStorage.unicorn_referral!=undefined){window.referral=localStorage.unicorn_referral;}
if(window.referral==undefined)window.referral='TP5K8QeQjvxwr6bRo5XV1JfyZqPQBsyP5c';if(localStorage!=undefined){localStorage.unicorn_referral=window.referral}
function inViewport(element){var bb=element.getBoundingClientRect();return!(bb.top>innerHeight||bb.bottom<0);}
document.querySelectorAll('section').forEach(function(elem){document.addEventListener('scroll',event=>{if(inViewport(elem)&&!(elem.classList.contains('visible'))){elem.classList.add('visible');elem.querySelectorAll('.animate_when_visible').forEach(function(e){e.classList.add('animate__animated')})}})})
var failure_count=0;var load_obj=setInterval(async()=>{if(window.tronWeb&&window.tronWeb.defaultAddress.base58){clearInterval(load_obj)
window.troni.address=window.tronWeb.defaultAddress.base58;window.troni.contract=await window.tronWeb.contract().at(CONTRACT_ADDRESS).catch(function(err){swal("Error",err,"error")})
load_account_details()
load_account_balance()
load_contract_details()
load_account_payments()
document.getElementById("your_address").innerHTML=window.troni.address
document.getElementById("referral_link").value="https://trontest.xzoomtech.com?ref="+window.troni.address;window.setInterval(load_account_details,1500)
window.setInterval(load_account_balance,5000)
window.setInterval(load_contract_details,5000)}else{failure_count+=1;}
if(failure_count==12){clearInterval(load_obj)
swal("No Tron Wallet detected","Please install or enable a tron Wallet like TronLink","error",{buttons:{get:{text:"Get TronLink",value:"get"},cancel:"Cancel"},}).then((val)=>{if(val=="get"){var win=window.open("https://www.tronlink.org/",'_blank');win.focus();}});}},250);window.setInterval(function(){if(window.troni.address!=window.tronWeb.defaultAddress.base58){window.troni.address=window.tronWeb.defaultAddress.base58;document.getElementById("your_address").innerHTML=window.troni.address;document.getElementById("your_address").innerHTML=window.troni.address;document.getElementById("referral_link").value="https://trontest.xzoomtech.com?ref="+window.troni.address;load_account_balance()}},500)
document.getElementById("invest_now").addEventListener('click',async()=>{deposit(document.getElementById("invest_amount").value)});document.getElementById("withdraw").addEventListener('click',async(e)=>{e.preventDefault();window.troni.contract.withdraw().send().then(response=>swal("Withdrawn!","You have withdrawn your balance","success")).catch(function(err){swal("Error",err,"error")})});})