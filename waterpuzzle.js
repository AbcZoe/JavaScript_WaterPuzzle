//addEventListener('觸發的條件',函式)觸發事件，DOMContentLoaded當html文件加載完畢時
document.addEventListener('DOMContentLoaded',()=>{
    const gameContainer=document.getElementById('game-container');
    const playerButton=document.getElementById('play-button');
    const labelSelect=document.getElementById('label-select');

    const tubes=[];
    let levelCount=1;

    labelSelect.addEventListener('change',(event)=>{
        const selectedLevel=parseInt(event.target.value,10);
        //parseInt(字串, 幾進位制);將一個字符串解析並轉換為整數
    });

    playerButton.addEventListener('click',()=>{

    });
});