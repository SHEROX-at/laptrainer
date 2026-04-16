body{
margin:0;
font-family:Inter, sans-serif;
background:#050816;
color:#e5e7eb;
}

/* SCREENS */
.screen{min-height:100vh;padding:20px;}
.center{display:flex;justify-content:center;align-items:center;}
.hidden{display:none;}

/* CARD */
.card{
background:#0f1325;
padding:30px;
width:320px;
}

/* INPUT */
input{
width:100%;
padding:14px;
margin-top:10px;
background:#0b0f1f;
border:1px solid #1f2937;
color:white;
}

/* BUTTON */
button{
width:100%;
padding:14px;
margin-top:10px;
background:#7c3aed;
border:none;
color:white;
cursor:pointer;
}

button.secondary{background:#111827;}

/* TOPBAR */
.topbar{
display:flex;
justify-content:space-between;
margin-bottom:20px;
font-weight:600;
}

/* CATEGORY */
.cat{
background:#0f1325;
padding:18px;
border-radius:12px;
margin-bottom:12px;
display:flex;
justify-content:space-between;
align-items:center;
}

.circle{
width:50px;height:50px;border-radius:50%;
background:#1f2937;
display:flex;align-items:center;justify-content:center;
}

/* QUIZ */
.answer{
background:#0b0f1f;
padding:14px;
margin-top:10px;
border-radius:8px;
}

.correct{background:#22c55e;}
.wrong{background:#ef4444;}

.progress{height:6px;background:#111;margin-bottom:10px;}
.bar{height:100%;background:#7c3aed;width:0%;}