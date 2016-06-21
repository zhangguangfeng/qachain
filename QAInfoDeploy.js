var Web3 = require('web3');
var web3 = new Web3();
var fs = require('fs');
var rOption = { flags : 'r',encoding : null,mode : 0666};
var wOption = {  flags: 'a',  encoding: null,  mode: 0666  }

var contractText = fs.readFileSync('QAInfo.sol','utf-8');
var fileWriteStream = fs.createWriteStream('QAInfo.log',wOption);
function  getHanzi( _contre){   
	var contre = _contre.substring( 2, _contre.length);
	return Buffer.from( contre,'hex').toString();
}

function getEntity(manager)
{
	for(var i=0;i<4;i++)
	{
		console.log("i:"+i+",外部账号:"+web3.eth.accounts[i]+",合约地址:"+manager.findEntity(web3.eth.accounts[i]));
		fileWriteStream.write( "i:"+i+",外部账号:"+web3.eth.accounts[i]+",合约地址:"+manager.findEntity(web3.eth.accounts[i]));
		if( manager.findEntity(web3.eth.accounts[i]) !=0)
		{
			var entitytmp = contractEntity.at(manager.findEntity(web3.eth.accounts[i]));
			//console.log(banktmp);
			console.log("name:"+getHanzi(entitytmp.query()[1])+"\nSocialCreditId:"+web3.toAscii(entitytmp.query()[2])+"\noperator:"+entitytmp.query()[3]);
		}
	}
}

function getChickenRec(chicken)
{
	for(var i=0;i<chicken.getRecordSums();i++)
	{
		console.log("时间："+web3.toAscii(chicken.getOneRecord(i)[0])+"\n信息:"+getHanzi(chicken.getOneRecord(i)[1])+"\n照片HASH:"+chicken.getOneRecord(i)[2]+"\n照片URL:"+web3.toAscii(chicken.getOneRecord(i)[3]));		
	}
}

web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));

//编译合约
var solCompiled = web3.eth.compile.solidity(contractText);
var contractQAManager = web3.eth.contract(solCompiled.QAManager.info.abiDefinition);
var contractEntity= web3.eth.contract(solCompiled.Entity.info.abiDefinition);
var contractChicken= web3.eth.contract(solCompiled.chicken.info.abiDefinition);

//创建系统管理角色的管理合约
var qaMnager = contractQAManager.new({from: web3.eth.accounts[0], data: solCompiled.QAManager.code, gas: 4200000}, function(e, contract){
    if(!e) {
      if(!contract.address) {
        console.log("Contract transaction send: TransactionHash: \n" + contract.transactionHash + " waiting to be mined...");
      }
      else 
      {
        console.log("QAManager Contract mined! address："+contract.address);
  
        qaMnager.createEntity.sendTransaction(1,web3.toHex('0x'+Buffer.from('千岛湖生态养殖公司').toString('hex')),'91430111MA4L1COMP1',web3.eth.accounts[1],{from: web3.eth.accounts[0], gas: 3900000},function(err, address) 
		{   
			if (err){   console.log(err); }
			else
			{   var filter = web3.eth.filter('latest');
		    	var ib =1;
		        console.log("waiting to be mined... "+ib);
		        filter.watch(function (error, log) {
				if(ib==0)
				{
					console.log("qaMnager.createEntity(千岛湖生态养殖公司) mined!");
					filter.stopWatching(); 
					

					//2			
					qaMnager.createEntity.sendTransaction(2,web3.toHex('0x'+Buffer.from('杭州区块运输有限公司').toString('hex')),'91430111MA4L1COMP2',web3.eth.accounts[2],{from: web3.eth.accounts[0], gas: 3900000},function(err, address) ///222
					{if (err){   console.log(err); }
					else{ var filter = web3.eth.filter('latest');	var ib =1;console.log("waiting to be mined... "+ib);
					filter.watch(function (error, log) {if(ib==0){console.log("qaMnager.createEntity(杭州区块运输有限公司) mined!");filter.stopWatching();

					//3		
					qaMnager.createEntity.sendTransaction(3,web3.toHex('0x'+Buffer.from('杭州快链超市文一店').toString('hex')),'91430111MA4L1COMP3',web3.eth.accounts[3],{from: web3.eth.accounts[0], gas: 3900000},function(err, address) ///222
					{if (err){   console.log(err); }
					else{ var filter = web3.eth.filter('latest');	var ib =1;console.log("waiting to be mined... "+ib);
					filter.watch(function (error, log) {if(ib==0){console.log("qaMnager.createEntity(杭州快链超市文一店) mined!");getEntity(qaMnager);filter.stopWatching();

					var entityYangzhi = contractEntity.at(qaMnager.findEntity(web3.eth.accounts[1]));
					//4	
					entityYangzhi.createChicken.sendTransaction('201606211846001FFAAB','0x79429d014e4d43b04bc650313c8f1a4eea2cb5df8ad399b749d2ce7cf1a2886b','0x1b84915a1235dc101b9418ec21db1a143d04fb83325a3e0dc2bb5631da8249af',{from: web3.eth.accounts[1], gas: 3900000},function(err, address) ///222
					{if (err){   console.log(err); }
					else{ var filter = web3.eth.filter('latest');	var ib =1;console.log("waiting to be mined... "+ib);
					filter.watch(function (error, log) {if(ib==0){console.log("entityYangzhi.createChicken(201606211846001FFAAB) mined!");filter.stopWatching();
					
					console.log("new chicken address :"+entityYangzhi.findChicken('201606211846001FFAAB'));
					var chicken =contractChicken.at(entityYangzhi.findChicken('201606211846001FFAAB'));
					
					//5	
					chicken.addRecord.sendTransaction('2016-06-21 08:14',web3.toHex('0x'+Buffer.from('出栏').toString('hex')),'0x1b84915a1235dc101b9418ec21db1a143d04fb83325a3e0dc2bb5631da8249af','baidu.com/img/logo1.png',{from: web3.eth.accounts[1], gas: 3900000},function(err, address) ///222
					{if (err){   console.log(err); }
					else{ var filter = web3.eth.filter('latest');	var ib =1;console.log("waiting to be mined... "+ib);
					filter.watch(function (error, log) {if(ib==0){console.log("chicken.addRecord mined!");filter.stopWatching();

					//6	
					chicken.addRecord.sendTransaction('2016-06-21 19:20',web3.toHex('0x'+Buffer.from('回栏').toString('hex')),'0x1b84915a1235dc101b9418ec21db1a143d04fb83325a3e0dc2bb5631da8249af','baidu.com/img/logo1.png',{from: web3.eth.accounts[1], gas: 3900000},function(err, address) ///222
					{if (err){   console.log(err); }
					else{ var filter = web3.eth.filter('latest');	var ib =1;console.log("waiting to be mined... "+ib);
					filter.watch(function (error, log) {if(ib==0){console.log("chicken.addRecord mined!");filter.stopWatching();
				
					getChickenRec(chicken);	
					
					
					}else{ib = ib -1;console.log("waiting to be mined... "+ib);}});}});///6
					
					}else{ib = ib -1;console.log("waiting to be mined... "+ib);}});}});///5

					
					}else{ib = ib -1;console.log("waiting to be mined... "+ib);}});}});///4
                           
					}else{ib = ib -1;console.log("waiting to be mined... "+ib);}});}});///3
                           
					}else{ib = ib -1;console.log("waiting to be mined... "+ib);}});}});///2


	          	}
	          	else
				{ib = ib -1;console.log("waiting to be mined... "+ib);}   
          	});
        	}
        });
      }
    }  
});
												
/*
生成生产企业对放养鸡编号的签名，可以验证编号的真伪，这两个数据保存在RFID中，二维码也保存该信息的索引。
var Util  = require('ethereumjs-util')
var privateKey = new Buffer('8888888888888888888888888888888888888888888888888888888888888888', 'hex')
var hashOfID = web3.sha3('201606211846001FFAAB', {encoding: 'hex'});
var msgHash = new Buffer(hashOfID.substring(2,hashOfID.length), 'hex')
console.log(msgHash.length);
var ret = Util.ecsign(msgHash,privateKey); 
console.log(ret.r.toString('hex')); //79429d014e4d43b04bc650313c8f1a4eea2cb5df8ad399b749d2ce7cf1a2886b
console.log(ret.s.toString('hex')); //1b84915a1235dc101b9418ec21db1a143d04fb83325a3e0dc2bb5631da8249af
*/