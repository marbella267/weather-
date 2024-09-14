 

var hoursData = ["11:00", " 12:00", "13:00", "14:00", "15:00", "16:00"] ;
let ctx = document.getElementById("myChart");
const temp_icons = {
  'sunny':'<i class="fa-regular fa-sun"></i>',
  'cloud':'<i class="fa-solid fa-cloud"></i>',
}
let temp_info = document.getElementById('temp-info') ;

const build_info = (temps,condition)=>{

  temp_info.style.marginLeft = '.5rem'
  temp_info.style.display = 'grid' ;
  temp_info.style.gridTemplateColumns  = `repeat(${temps.length}, auto)`;

  for(let i = 0 ; i<temps.length;i++){

  let div =  document.createElement('div') ;
  temp_info.appendChild(div) ;
  div.style.fontWeight = 'bold'

  div.style.width = `${(ctx.getBoundingClientRect().width/5)-14}px`
  if(i ==temps.length-1){
    div.style.width = 'auto'
  }
  let key = condition[i]
  let icon = temp_icons[`${key}`];
  
  div.innerHTML = `<p >${temps[i]}</p>
  <p style=color:${key=='cloud'?'#7FA1C3':'#f1c232'};>${icon}</p>` ;
  }
  
}
let temp = [20, 19, 20, 27, 23, 32]
let condition = ['cloud','sunny','sunny','cloud','cloud','sunny']

build_info(temp,condition)

 

var config = 
{
 
  type: "line",
  data: {
    labels:hoursData , 
    datasets: [
      {
 
        data: [20, 19, 20, 27, 23, 32],
        borderWidth: 1,
        borderColor: ["#abc7f1 "],
        fill: true,
        // backgroundColor:' rgba(175, 173, 173, 0.413)'
      } 
    ],
    
  },
  options: {
    elements: {
      point:{
          radius: 0
      }
  },
 
    maintainAspectRatio: false,
    
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        display: false,
        grid: { drawOnChartArea: false },
        stacked:true
      },
      x: {
        grid: {
          drawOnChartArea: false,
        },
        stacked:true,
        ticks:{
          stepSize : 1 
        }
      },  
    },

    plugins: {
      legend: {
        display: false,
      },
    }
    ,
    
  },
  plugins: [{
      afterDraw: function (chart) {
          const ctx = chart.ctx;
          const xAxis = chart.scales.x;
          // Draw vertical line at x-axis value 4
           
          for(let i = 0 ; i<hoursData.length;i++){
          var xValue = xAxis.getPixelForValue(i);
          ctx.save();
          ctx.strokeStyle = 'black';
          ctx.lineWidth = .5;
          ctx.beginPath();
          ctx.moveTo(xValue,  10);
          ctx.lineTo(xValue, chart.height-30);
          ctx.stroke();
          ctx.restore();
          };
          
      }
  }]
}
 
 



 
 



 