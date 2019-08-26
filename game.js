window.onload = function(){
    let canvas = document.getElementsByClassName("canvas")[0];
    let context = canvas.getContext("2d");  
    let dr = "e";
    let level = 0;
    let obstaclesNum = 0;
    let obstaclesCoords = []
    let count = 0;
    let snake = [{x:3,y:0},{x:2,y:0},{x:1,y:0},{x:0,y:0}]    
    let aim = {y: Math.round(Math.random()*(canvas.height/7)), x: Math.round(Math.random()*(canvas.width/7))};

    
    const directionsPerKey = {37: "w", 38: "n", 39: "e", 40: "s"};
    const directionsSkip = {"w": "e", "e": "w", "n": "s", "s": "n"};
    
    
    const setDirection = (e) => {dr = (directionsSkip[directionsPerKey[e.keyCode]]==dr)?dr:directionsPerKey[e.keyCode]}
    
    
    const resetAim = () => {count++;
        return {y: Math.round(Math.random()*(canvas.height/7)), x: Math.round(Math.random()*(canvas.width/7))};
        
    }
    
    const getCoords = () => {
        for(let i=0;i<obstaclesNum;i++){
            let c = resetAim();
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
    }
    document.addEventListener("keydown", setDirection);
    
    
    const showSquare = (x,y) => {
        context.fillStyle = "green";
        context.fillRect(x*7,y*7,7,7);
    }
    

    const showSnake = () => {
        
        context.clearRect(0,0,canvas.width, canvas.height);
        
        snake.forEach(function(item){showSquare(item.x, item.y);})
        showAim(aim.x, aim.y);
        showObstacles();
        if(level>=1) border();
        let hx = snake[0].x
        let hy = snake[0].y

        if(level>=1 && (hx<0||hy<0||canvas.width/7<=hx||canvas.height/7<=hy)) throw new Error("You`ve lost");
    
        hx = (canvas.width/7<=hx)? 0:(hx<0)? Math.round(canvas.width/7):hx;
        hy = (canvas.height/7<=hy)? 0:(hy<0)? Math.round(canvas.height/7):hy;
        
        snake.pop();
        
        hx = (dr=="w")? hx-1:(dr=="e")? hx+1:hx;
        hy = (dr=="n")? hy-1:(dr=="s")? hy+1:hy;
        
        aim = (hx==aim.x && hy==aim.y)? resetAim():aim;
        
        if(count==2){level++;count=0;alert("level up");obstaclesNum=(level-1)*5;obstaclesCoords = [];getCoords();}
        
        let head = {x:hx,y:hy};
        
        snake.unshift(head);
    }
    
    setInterval(showSnake, 100);
};
