document.getElementsByClassName("button")[0].onclick = function(){
    let canvas = document.getElementsByClassName("canvas")[0];
    let context = canvas.getContext("2d");
    context.save();
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.restore();
    context.beginPath();

    let dr = "e";
    let level = 0;
    let obstaclesNum = 0;
    let obstaclesCoords = []
    let count = 0;
    let score = 0;
    let status = false;
    let snake = [{x:3,y:0},{x:2,y:0},{x:1,y:0},{x:0,y:0}]  
    let aim = {y: Math.round(Math.random()*(canvas.height/7)), x: Math.round(Math.random()*(canvas.width/7))};

    
    const directionsPerKey = {37: "w", 38: "n", 39: "e", 40: "s"};
    const directionsSkip = {"w": "e", "e": "w", "n": "s", "s": "n"};
    
    
    const setDirection = (e) => {dr = (directionsSkip[directionsPerKey[e.keyCode]]==dr)?dr:directionsPerKey[e.keyCode]}
    
    
    const resetAim = () => {count++;score++;
        return {y: Math.round(Math.random()*(canvas.height/7)), x: Math.round(Math.random()*(canvas.width/7))};
        
    }
    const resetObstacle = () => {
        return {y: Math.round(Math.random()*(canvas.height/7)), x: Math.round(Math.random()*(canvas.width/7))};
        
    }
    
    const getCoords = (obstaclesNum) => {
        for(let i=0;i<obstaclesNum;i++){
            let c = resetObstacle();
            if (c!=aim) obstaclesCoords.unshift(c);
        }
    }
    
    const showAim = (x,y) => {
        context.fillStyle = "white";
        context.fillRect(x*7,y*7,7,7);
    }
    
    const showObstacle = (x,y) =>{
        context.fillStyle = "red";
        context.fillRect(x*7, y*7,7,7);
    }
    
    const showObstacles = () => {
        obstaclesCoords.forEach(function(item){showObstacle(item.x,item.y);});
    }
    
    const border = () =>{
        context.lineWidth = "2";
        context.strokeStyle = "red";
        context.rect(0, 0, canvas.width, canvas.height);
        context.stroke();
        context.closePath();
    }
    document.addEventListener("keydown", setDirection);
    
    
    const showSquare = (x,y) => {
        context.fillStyle = "green";
        context.fillRect(x*7,y*7,7,7);
    }
    

    const showSnake = () => {
        context.clearRect(0,0,canvas.width, canvas.height);
        console.log(count);
        snake.forEach(function(item){showSquare(item.x, item.y);})
        showAim(aim.x, aim.y);
        showObstacles();
        if(level>=1) border();
        if(count>=20){level++;
            count=0;
            snake = [{x:3,y:0},{x:2,y:0},{x:1,y:0},{x:0,y:0}]  
            alert("level up");
            obstaclesNum=(level-1)*5    ;
            obstaclesCoords = [];
            getCoords(obstaclesNum);
        }
        let hx = snake[0].x
        let hy = snake[0].y

        if(level>=1 && (hx<0||hy<0||canvas.width/7<=hx||canvas.height/7<=hy)) status=true;
    
        hx = (canvas.width/7<=hx)? 0:(hx<0)? Math.round(canvas.width/7):hx;
        hy = (canvas.height/7<=hy)? 0:(hy<0)? Math.round(canvas.height/7):hy;
        
        
        snake.pop();
        
        hx = (dr=="w")? hx-1:(dr=="e")? hx+1:hx;
        hy = (dr=="n")? hy-1:(dr=="s")? hy+1:hy;
        
        for(let i = 0;i<obstaclesNum;i++){
            if(hy==obstaclesCoords[i].y && hx==obstaclesCoords[i].x) status=true;
        }
        for(let i=0;i<snake.length-2;i++){
            if(hy==snake[i].y && hx==snake[i].x) status=true;
        }

        
        if(hx==aim.x && hy==aim.y){
            aim = resetAim();
            let tail = {x:hx,y:hy};
            snake.unshift(tail);
        }
        
       
        
        let head = {x:hx,y:hy};
        
        snake.unshift(head);
        if(status){
            alert("Your score: "+score);
            document.location.reload(true);
        }
        document.getElementsByClassName("button")[0].onclick = function(){document.location.reload(true);}
        document.getElementsByClassName("score")[0].innerHTML = "Score: "+score;
    }
    
    setInterval(showSnake, 100);
};
