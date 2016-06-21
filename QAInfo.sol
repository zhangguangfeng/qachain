//食品溯源管理者,负责创建加入食品溯源的企业
contract QAManager {
  address public owner;
  address[] EntityOperators;
  bytes32[] EntityNames;
  address[] EntityContracts;
  
  function QAManager() {
    owner     = msg.sender;
  }

  function createEntity  (uint _entityType,bytes32 _name, bytes32 _SocialCreditId,address _operator)onlyowner { 
    EntityOperators.push(_operator);
    EntityNames.push(_name);
    EntityContracts.push(new Entity(_entityType,_name,_SocialCreditId, _operator));
  }

  function findEntity(address _account) constant returns(address) {
    uint size = EntityOperators.length;
    for( uint n=0; n<size; n++) {
      if(_account == EntityOperators[n]) {
        return EntityContracts[n];
      }
    }
  }
  
  function findEntityAcct(address _addrCont) constant returns(address) {
    uint size = EntityOperators.length;
    for( uint n=0; n<size; n++) {
      if(_addrCont == EntityContracts[n]) {
        return EntityOperators[n];
      }
    }
  }

  modifier onlyowner() {
    if(msg.sender != owner) throw;
    _
  }
}
//实体企业，包括放养鸡饲养场，运输企业和销售企业
contract Entity {
  address public owner;
  address public operator;
  bytes32   public name;
  bytes32   public socialCreditId;
  uint entityType;

  bytes32[] ChickenIds;
  bytes32[] ChickenIdSignRs; 
  bytes32[] ChickenIdSignSs; 
  address[] ChickenContracts;

  function Entity(uint _entityType,bytes32 _name, bytes32 _socialCreditId,address _operator){  
    owner     = msg.sender;
    entityType = _entityType;
    name      = _name;
    operator  = _operator;    
  	socialCreditId = _socialCreditId;
  }
    
  modifier onlyowner() {
    if(msg.sender != operator) throw;
    _
  }

  function query() constant returns(uint, bytes32,bytes32,address) {
    return (entityType,name,socialCreditId,operator);
  }
  
  function createChicken(bytes32 _chickenId, bytes32 _chickenIdSignR, bytes32 _chickenIdSignS)onlyowner { 
    if( entityType != 1 )throw;//只有第一类企业，放养场能创建‘新鸡’

    ChickenIds.push(_chickenId);
    ChickenIdSignRs.push(_chickenIdSignR);
    ChickenIdSignSs.push(_chickenIdSignS);
    ChickenContracts.push(new chicken(_chickenId,_chickenIdSignR,_chickenIdSignS));
  }

  function queryCC() constant returns(address[]) {
    return ChickenContracts;
  }
  
  
  function findChicken(bytes32 _chickenId) constant returns(address) {
    uint size = ChickenContracts.length;
    for( uint n=0; n<size; n++) {
      if(_chickenId == ChickenIds[n]) {
        return ChickenContracts[n];
      }
    }
  }
}


contract chicken {
  address owner;
  bytes32 chickenId;
  bytes32 chickenIdSignR;
  bytes32 chickenIdSignS;
  address[] recordAddrs;
 
  function chicken(bytes32 _chickenId, bytes32 _chickenIdSignR, bytes32 _chickenIdSignS) {
    owner     = msg.sender;
    chickenId = _chickenId;
    chickenIdSignR = _chickenIdSignR;
    chickenIdSignS = _chickenIdSignS;
  }
  
  
  function query() constant returns (bytes32, bytes32,bytes32,address) {
    return (chickenId,chickenIdSignR, chickenIdSignS,owner);
  }

  function addRecord(bytes32 _date, bytes32 _info,bytes32 _picHash, bytes32 _picURL)
  {
    recordAddrs.push(new CRecord(_date,_info,_picHash,_picURL));
  }
  //获取总条数
  function getRecordSums() constant returns(uint) {
    return  recordAddrs.length;
  }
  
  function getOneRecord(uint recordNo) constant returns(bytes32, bytes32, bytes32, bytes32) {
    CRecord cRec = CRecord(recordAddrs[recordNo]);
    return cRec.getRecord();
  }
 
  modifier onlyHolder {
    if(msg.sender != owner) throw;
    _
  }
}

contract CRecord{
	bytes32 date;
	bytes32 info;
	bytes32 picURL;
	bytes32 picHash;
  function CRecord(bytes32 _date, bytes32 _info,bytes32 _picHash,bytes32 _picURL)
  {
    date = _date;
    info = _info;
    picURL = _picURL;
    picHash = _picHash;
  }

  function getRecord() constant returns(bytes32, bytes32, bytes32, bytes32){
    return( date,info,picHash,picURL);
  }
}



