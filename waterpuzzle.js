//addEventListener('觸發的條件',函式)觸發事件，DOMContentLoaded當html文件加載完畢時
document.addEventListener('DOMContentLoaded',()=>{
    const gameContainer=document.getElementById('game-container');
    const playerButton=document.getElementById('play-button');
    const labelSelect=document.getElementById('label-select');

    const tubes=[];
    let selectedTube=null;
    const colors = [
        "#FF5733", // 紅色
        "#33FF57", // 綠色
        "#3357FF", // 藍色
        "#FF33A1", // 粉紅色
        "#FFD700", // 金色
        "#7FFF00", // 黃綠色
        "#8A2BE2", // 紫色
        "#FF4500", // 橙色
        "#00CED1", // 深青色
        "#FF6347", // 番茄色
        "#ADFF2F", // 春天綠色
        "#F0E68C", // 卡其色
        "#E0FFFF", // 淺青色
        "#FF1493", // 深粉紅色
        "#FFD700", // 金黃色
        "#90EE90", // 淺綠色
        "#D2691E", // 巧克力色
        "#CD5C5C", // 印度紅色
        "#B0C4DE", // 淺鋼藍色
        "#F08080"  // 淺珊瑚色
      ];
    let levelCount=1;

    function chooseLevel(Level){
        levelCount=Level;
        document.getElementById('level-count').textContent=levelCount;
    }

    labelSelect.addEventListener('change',(event)=>{
        //parseInt(字串, 幾進位制);將一個字符串解析並轉換為整數
        const selectedLevel=parseInt(event.target.value,10);
        chooseLevel(selectedLevel);
    });

    function pourWater(fromTube,toTube){
        let fromWater = fromTube.querySelector('.water:last-child');
        let toWater = toTube.querySelector('.water:last-child');
        if(!toWater){
            const color=fromWater? fromWater.style.background:null;
            while(fromWater&&fromWater.style.background===color&&toTube.childElementCount<4){
                toTube.appendChild(fromWater);
                fromWater=fromTube.querySelector('.water:last-child');
            }
        }else{
            while(fromWater&&fromWater.style.background===toWater.style.background&&toTube.childElementCount<4){
                toTube.appendChild(fromWater);
                fromWater=fromTube.querySelector('.water:last-child');
                toWater=toTube.querySelector('.water:last-child');
            }
        }
    }

    function selectTube(tube){
        if (selectedTube){
            if (selectedTube!=tube){
                pourWater(selectedTube,tube);
            }
            selectedTube.classList.remove('selected');
            selectedTube=null;
        }else{
            selectedTube=tube;
            selectedTube.classList.add('selected');
        }
    }

    function createTubes(){
        //gameContainer.innerHTML+='產生試管';
        gameContainer.innerHTML='';
        tubes.length=0;

        //遊戲用試管
        for (let i=0;i<levelCount+1;i++){
            const tube=document.createElement('div');
            tube.classList.add('tube'); //.classList.add('') 為物件添加一個class
            tube.addEventListener('click',()=>selectTube(tube));
            gameContainer.appendChild(tube);
            tubes.push(tube); //.push() 將一個或多個元素添加到陣列的末尾
        }
        //緩衝用試管
        for (let i=0;i<2;i++){
            const emptyTube=document.createElement('div');
            emptyTube.classList.add('tube');
            emptyTube.addEventListener('click',()=>selectTube(emptyTube));
            gameContainer.appendChild(emptyTube);
            tubes.push(emptyTube);
        }
    }

    function fillTubes(){
        //gameContainer.innerHTML+='填滿試管';
        const gameColors = colors.slice(0,Math.min(levelCount+1,colors.length));
            //.slice() 返回一個新的子陣列，而不會修改原始陣列。你可以指定切割的起始和結束位置，來選擇你要提取的陣列元素。
        const waterBlocks=[];
        //每個顏色產生四個Block
        gameColors.forEach((color)=>{
            for (let i=0;i<4;i++){
                waterBlocks.push(color);
            }
        });
        //打亂顏色位置，並分散在不同試管內
        waterBlocks.sort(()=>0.5-Math.random());
            //.sort()對陣列中的元素進行排序。它會直接修改原來的陣列。
        let blockIndex=0;
        tubes.slice(0,levelCount+1).forEach(tube=>{
            for (let i=0;i<4;i++){
                if(blockIndex<waterBlocks.length){
                    const water=document.createElement('div');
                    water.classList.add('water');
                    water.style.background=waterBlocks[blockIndex];
                    water.style.height='20%';
                    tube.appendChild(water)
                    blockIndex++;
                }
            }
        });
    }

    playerButton.addEventListener('click',()=>{
        //alert('開始玩遊戲!')
        tubes.length=0;
        createTubes();
        fillTubes();
    });
});