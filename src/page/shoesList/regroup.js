let shopID = '';

function renameImage(list,selectedType){
    let array = [];
    list.forEach((element, key) => {
        array.push(makeUrl(selectedType) + element + '!thum');
    });
    return array;
}

function makeUrl(selectedType) {
    return 'http://image-upyun-zhu.test.upcdn.net/DB/'+shopID+'/'+ selectedType.sex + '/'+selectedType.type+'/'; 
};

function isSelect(selectedType) {
    let selectedTypeList = {};
    selectedTypeList[selectedType.type] = selectedTypeList[selectedType.sex] = 'btn-primary';
    return selectedTypeList;
};


export default  (table, shopId, selectedType = {sex:'0', type:'ban'}) => {
    if(shopId) shopID = shopId;
    return {
        shoesList: renameImage(table[selectedType.sex][selectedType.type], selectedType),
        selectedTypeList: isSelect(selectedType),
    }
};