//Code for top items in panel:
// const clzKey = 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNyc2Etc2hhNTEyIiwidHlwIjoiSldUIn0.eyJ1c2VyTmFtZSI6ImFwaS51c2VyLm1vZGVybiIsInVzZXJJZCI6IjkuMjg1NDIzNzQ1LjM0OTcxMjY1IiwiYXBpS2V5SWQiOiI2NzAuMTAxMTg1LjM0OTcxMjY1IiwiYXBwbGljYXRpb25BY2Nlc3MiOiJBcGkiLCJuYmYiOjE2MDY1NzU4NzAsImV4cCI6MTYzODExMTg3MCwiaXNzIjoiY2xhcml6ZW4uY29tIn0.VMeRxJ9L2TcJsr9GMAe-mKSk9Y5VZjofKjYPQF7GpznFQ2xckTF3EJ7DEGpPvbArcnurAtEiuKjWtjNfABoCyNoQV8nMOWULbkNLBDKoYIMDeYX6KfAOAVYWD7Q5rY5eSyXNoR3k_fMdrLEZAyMD5ng4TINWA92p-TcATQEb5fjoe954I_jQbc_8fVOOGtKaa_uOV4OTkSYEoLrAtGlhsJONca7dBFK7WmS6YWNTClFa2wPbk4-SjNZBX8mgeMGgquv7sNzq6vGTr20NhFS3I4V0HnIA7Q-Vi8JtMBtVYwRt2-MCeGNqgAAsdYKpgIWO9jtwVaOi3w32T4PtkkP2rg'
// const url = 'https://api.clarizen.com/V2.0/services/'

var rawResultBoxActive= $('#rawResultBoxActive');
var rawResultBoxDraft= $('#rawResultBoxDraft');
var rawResultBoxCompleted= $('#rawResultBoxCompleted');

var rawResultBoxOnTrack= $('#rawResultBoxOnTrack');
var rawResultBoxAtRisk= $('#rawResultBoxAtRisk');
var rawResultBoxOffTrack= $('#rawResultBoxOffTrack');

var rawResultBoxOnTrackBudget= $('#rawResultBoxOnTrackBudget');
var rawResultBoxAtRiskBudget= $('#rawResultBoxAtRiskBudget');
var rawResultBoxOffTrackBudget= $('#rawResultBoxOffTrackBudget');

//var rawResultBoxTotalTasks= $('#rawResultBoxTotalTasks');
//var rawResultBoxGoTasks= $('#rawResultBoxGoTasks');
//var rawResultBoxJiraTasks= $('#rawResultBoxJiraTasks');

performQuery("select count() as cnt, state from project group by state");
performQuery2("select count() as cnt, trackstatus from project group by trackstatus");
performQuery3("select count() as cnt, budgetstatus from project group by budgetstatus");
//performQuery4("select count() as cnt, state from task where state='Active'");
//performQuery5("select count() as cnt, state from task where state='Active' and (ClarizenGoBoard <> null or ClarizenGoStage <> null)");
//performQuery6("select count() as cnt, state from task where state='Active' and C_CreateWorkItemInJIRA = true");

function performQuery(queryString) {

  API.Objects.query(queryString, function(qResults, paging) {
    if (qResults) {
      
      rawResultBoxActive.val(qResults[0].cnt);
      rawResultBoxDraft.val(qResults[1].cnt);
      rawResultBoxCompleted.val(qResults[2].cnt);
    }
                });  
}

function performQuery2(queryString) {

  API.Objects.query(queryString, function(qResults, paging) {
    if (qResults) {
      
      rawResultBoxOnTrack.val(qResults[3].cnt);
      rawResultBoxAtRisk.val(qResults[2].cnt);
      rawResultBoxOffTrack.val(qResults[0].cnt);
    }
                });  
}

function performQuery3(queryString) {

  API.Objects.query(queryString, function(qResults, paging) {
    if (qResults) {
      
      rawResultBoxOnTrackBudget.val(qResults[3].cnt);
      rawResultBoxAtRiskBudget.val(qResults[2].cnt);
      rawResultBoxOffTrackBudget.val(qResults[0].cnt);
    }
                });  
}







const filesData = API.Context.getData();
let filesDataDescrUpdated = updateDescr(filesData);
filesDataDescrUpdated.sort(compare);

function updateDescr(array) {
    var arrayChange = array.files;
    var i;
    for (i = 0; i < arrayChange.length; i++) {
      if(arrayChange[i].description === null){
         //console.log(arrayChange[i]);
         arrayChange[i].description = "";
      }
      if(arrayChange[i].DocumentType === null){
         //console.log(arrayChange[i]);
         arrayChange[i].DocumentType = "";
      }
      //Do update object?
    }   
    return arrayChange; 
}


function compare(a, b) {
  const bandA = a.Name;
  const bandB = b.Name;

  let comparison = 0;
  if (bandA.toUpperCase() > bandB.toUpperCase()) {
    comparison = 1;
  } else if (bandA.toUpperCase() < bandB.toUpperCase()) {
    comparison = -1;
  }
  return comparison;
}



performLatestProjectsQuery("select sysid, name, state, budgetstatus, startdate, duedate, C_ObjectURL, PercentCompleted, PlannedBudget, actualcost, RemainingEffort, createdon from project order by sysid asc limit 100");

function performLatestProjectsQuery(queryString) {

  API.Objects.query(queryString, function(qResults, paging) {
    if (qResults) {
      
			var tbl = document.createElement('table');
      tbl.id = "tableList";
      tbl.className = "table table-condensed";
      //tbl.style.width = '60%';
      tbl.style.color = "#b3b3b3";
      tbl.style.borderCollapse = "collapse";
      
      var thead = tbl.createTHead();
      thead.style.position = "sticky";
      
      var row = thead.insertRow();
      row.style.color = "#dfe2e5";
      var th1 = document.createElement("TH");
      th1.style.border = "none";
      th1.style.backgroundColor = "#0000009e";
      th1.style.borderRadius = "5px 0px 0px 5px";
      th1.innerHTML = ('ID');
      row.appendChild(th1);
      var th2 = document.createElement("TH");
      th2.style.border = "none";
      th2.style.backgroundColor = "#0000009e";
      th2.innerHTML = ('NAME');
      row.appendChild(th2);
      var th3 = document.createElement("TH");
      th3.style.border = "none";
      th3.style.backgroundColor = "#0000009e";
      th3.style.textAlign = "center";
      th3.innerHTML = ('STATE');
      row.appendChild(th3);
      var th4 = document.createElement("TH");
      th4.style.border = "none";
      th4.style.backgroundColor = "#0000009e";
      th4.style.textAlign = "center";
      th4.innerHTML = ('$ STATUS');
      row.appendChild(th4);
      var th5 = document.createElement("TH");
      th5.style.border = "none";
      th5.style.backgroundColor = "#0000009e";
      th5.style.textAlign = "center";
      th5.innerHTML = ('START DATE');
      row.appendChild(th5);
      var th6 = document.createElement("TH");
      th6.style.border = "none";
      th6.style.backgroundColor = "#0000009e";
      th6.style.textAlign = "center";
      th6.innerHTML = ('DUE DATE');
      row.appendChild(th6);
      var th7 = document.createElement("TH");
      th7.style.border = "none";
      th7.style.backgroundColor = "#0000009e";
      th7.style.textAlign = "right";
      th7.innerHTML = ('% COMPLETED');
      row.appendChild(th7);
      var th8 = document.createElement("TH");
      th8.style.border = "none";
      th8.style.backgroundColor = "#0000009e";
      th8.style.textAlign = "right";
      th8.innerHTML = ('BUDGETED COST');
      row.appendChild(th8);
      var th9 = document.createElement("TH");
      th9.style.border = "none";
      th9.style.backgroundColor = "#0000009e";
      th9.style.textAlign = "right";
      th9.innerHTML = ('ACTUAL COST');
      row.appendChild(th9);
      var th10 = document.createElement("TH");
      th10.style.border = "none";
      th10.style.backgroundColor = "#0000009e";
      th10.style.borderRadius = "0px 5px 5px 0px";
      th10.style.textAlign = "right";
      th10.innerHTML = ('REMAINING EFFORT');
      row.appendChild(th10);

      var tbody = tbl.createTBody();
      
      var i;
			for (i = 0; i < qResults.length; i++) 
      {
        var tr = tbody.insertRow();
        var newTD1 = tr.insertCell();
        //newTD1.style.border = "none";
        newTD1.style.borderColor = "dimgray";
        newTD1.innerHTML = (qResults[i].sysid);
        var newTD2 = tr.insertCell();
        newTD2.style.borderColor = "dimgray";
        newTD2.innerHTML = ('<span>' + '<a href=' + qResults[i].C_ObjectURL + ' target="_blank">' + qResults[i].name + '</a>' + '</span>');
        var newTD3 = tr.insertCell();
        newTD3.style.borderColor = "dimgray";
        newTD3.style.textAlign = "center";
        newTD3.innerHTML = (qResults[i].state.id.substring(7, qResults[i].state.id.length));
        var newTD4 = tr.insertCell();
        newTD4.style.borderColor = "dimgray";
        newTD4.style.textAlign = "center";
        newTD4.innerHTML = ('<span class="badge" style="background-color: dimgray;">' + qResults[i].budgetstatus.id.substring(14, qResults[i].budgetstatus.id.length) + '</span>');
        if(qResults[i].budgetstatus.id.substring(14, qResults[i].budgetstatus.id.length) == "Off Track") {
          newTD4.innerHTML = ('<span class="badge" style="background-color: #e64748;">' + qResults[i].budgetstatus.id.substring(14, qResults[i].budgetstatus.id.length) + '</span>');
        }
        else if(qResults[i].budgetstatus.id.substring(14, qResults[i].budgetstatus.id.length) == "On Track") {
          newTD4.innerHTML = ('<span class="badge" style="background-color: #1bc670;">' + qResults[i].budgetstatus.id.substring(14, qResults[i].budgetstatus.id.length) + '</span>');
        }
        else if(qResults[i].budgetstatus.id.substring(14, qResults[i].budgetstatus.id.length) == "At Risk") {
          newTD4.innerHTML = ('<span class="badge" style="background-color: #ebbb3a;">' + qResults[i].budgetstatus.id.substring(14, qResults[i].budgetstatus.id.length) + '</span>');
        }
        var newTD5 = tr.insertCell();
        newTD5.style.borderColor = "dimgray";
        newTD5.style.textAlign = "center";
        newTD5.innerHTML = (qResults[i].startdate.substring(0, 10));
        var newTD6 = tr.insertCell();
        newTD6.style.borderColor = "dimgray";
        newTD6.style.textAlign = "center";
        newTD6.innerHTML = (qResults[i].duedate.substring(0, 10));
        var newTD7 = tr.insertCell();
        newTD7.style.borderColor = "dimgray";
        newTD7.style.textAlign = "right";
        newTD7.innerHTML = (Math.round(qResults[i].PercentCompleted));
        var newTD8 = tr.insertCell();
        newTD8.style.borderColor = "dimgray";
        newTD8.style.textAlign = "right";
        newTD8.innerHTML = (Math.round(qResults[i].PlannedBudget.value).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' ' + qResults[i].PlannedBudget.currency);
        var newTD9 = tr.insertCell();
        newTD9.style.borderColor = "dimgray";
        newTD9.style.textAlign = "right";
        newTD9.innerHTML = (Math.round(qResults[i].actualcost.value).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' ' + qResults[i].actualcost.currency);
        var newTD10 = tr.insertCell();
        newTD10.style.borderColor = "dimgray";
        newTD10.style.textAlign = "right";
        newTD10.innerHTML = (qResults[i].RemainingEffort.value + ' ' + qResults[i].RemainingEffort.unit);

        document.getElementById("latestProjects").appendChild(tbl);
        
			}
      
    }
  });  
}



performLatestRisksQuery("select sysid, title, state, Severity, duedate, C_RiskObjectURL, PercentCompleted, riskstate, impact, PercentProbability, riskrate, createdon from risk order by createdon desc limit 100");

function performLatestRisksQuery(queryString) {

  API.Objects.query(queryString, function(qResults, paging) {
    if (qResults) {
      
			var tbl = document.createElement('table');
      tbl.id = "tableList";
      tbl.className = "table table-condensed";
      //tbl.style.width = '60%';
      tbl.style.color = "#b3b3b3";
      tbl.style.borderCollapse = "collapse";
      
      var thead = tbl.createTHead();
      thead.style.position = "sticky";
      
      var row = thead.insertRow();
      row.style.color = "#dfe2e5";
      var th1 = document.createElement("TH");
      th1.style.border = "none";
      th1.style.backgroundColor = "#0000009e";
      th1.style.borderRadius = "5px 0px 0px 5px";
      th1.innerHTML = ('ID');
      row.appendChild(th1);
      var th2 = document.createElement("TH");
      th2.style.border = "none";
      th2.style.backgroundColor = "#0000009e";
      th2.innerHTML = ('TITLE');
      row.appendChild(th2);
      var th3 = document.createElement("TH");
      th3.style.border = "none";
      th3.style.backgroundColor = "#0000009e";
      th3.style.textAlign = "center";
      th3.innerHTML = ('STATE');
      row.appendChild(th3);
      var th4 = document.createElement("TH");
      th4.style.border = "none";
      th4.style.backgroundColor = "#0000009e";
      th4.style.textAlign = "center";
      th4.innerHTML = ('IMPORTANCE');
      row.appendChild(th4);
      var th5 = document.createElement("TH");
      th5.style.border = "none";
      th5.style.backgroundColor = "#0000009e";
      th5.style.textAlign = "center";
      th5.innerHTML = ('DUE DATE');
      row.appendChild(th5);
      var th6 = document.createElement("TH");
      th6.style.border = "none";
      th6.style.backgroundColor = "#0000009e";
      th6.style.textAlign = "center";
      th6.innerHTML = ('% COMPLETED');
      row.appendChild(th6);
      var th7 = document.createElement("TH");
      th7.style.border = "none";
      th7.style.backgroundColor = "#0000009e";
      th7.style.textAlign = "right";
      th7.innerHTML = ('RISK STRATEGY');
      row.appendChild(th7);
      var th8 = document.createElement("TH");
      th8.style.border = "none";
      th8.style.backgroundColor = "#0000009e";
      th8.style.textAlign = "right";
      th8.innerHTML = ('IMPACT');
      row.appendChild(th8);
      var th9 = document.createElement("TH");
      th9.style.border = "none";
      th9.style.backgroundColor = "#0000009e";
      th9.style.textAlign = "right";
      th9.innerHTML = ('% PROBABILITY');
      row.appendChild(th9);
      var th10 = document.createElement("TH");
      th10.style.border = "none";
      th10.style.backgroundColor = "#0000009e";
      th10.style.borderRadius = "0px 5px 5px 0px";
      th10.style.textAlign = "right";
      th10.innerHTML = ('RISK RATE');
      row.appendChild(th10);

      var tbody = tbl.createTBody();
      
      var i;
			for (i = 0; i < qResults.length; i++) 
      {
        var tr = tbody.insertRow();
        var newTD1 = tr.insertCell();
        //newTD1.style.border = "none";
        newTD1.style.borderColor = "dimgray";
        newTD1.innerHTML = (qResults[i].sysid);
        var newTD2 = tr.insertCell();
        newTD2.style.borderColor = "dimgray";
        newTD2.innerHTML = ('<span>' + '<a href=' + qResults[i].C_RiskObjectURL + ' target="_blank">' + qResults[i].title + '</a>' + '</span>');
        var newTD3 = tr.insertCell();
        newTD3.style.borderColor = "dimgray";
        newTD3.style.textAlign = "center";
        newTD3.innerHTML = (qResults[i].state.id.substring(7, qResults[i].state.id.length));
        var newTD4 = tr.insertCell();
        newTD4.style.borderColor = "dimgray";
        newTD4.style.textAlign = "center";
        newTD4.innerHTML = ('<span class="badge" style="background-color: dimgray;">' + qResults[i].budgetstatus.id.substring(14, qResults[i].budgetstatus.id.length) + '</span>');
        if(qResults[i].budgetstatus.id.substring(14, qResults[i].budgetstatus.id.length) == "Off Track") {
          newTD4.innerHTML = ('<span class="badge" style="background-color: #e64748;">' + qResults[i].budgetstatus.id.substring(14, qResults[i].budgetstatus.id.length) + '</span>');
        }
        else if(qResults[i].budgetstatus.id.substring(14, qResults[i].budgetstatus.id.length) == "On Track") {
          newTD4.innerHTML = ('<span class="badge" style="background-color: #1bc670;">' + qResults[i].budgetstatus.id.substring(14, qResults[i].budgetstatus.id.length) + '</span>');
        }
        else if(qResults[i].budgetstatus.id.substring(14, qResults[i].budgetstatus.id.length) == "At Risk") {
          newTD4.innerHTML = ('<span class="badge" style="background-color: #ebbb3a;">' + qResults[i].budgetstatus.id.substring(14, qResults[i].budgetstatus.id.length) + '</span>');
        }
        var newTD5 = tr.insertCell();
        newTD5.style.borderColor = "dimgray";
        newTD5.style.textAlign = "center";
        newTD5.innerHTML = (qResults[i].startdate.substring(0, 10));
        var newTD6 = tr.insertCell();
        newTD6.style.borderColor = "dimgray";
        newTD6.style.textAlign = "center";
        newTD6.innerHTML = (qResults[i].duedate.substring(0, 10));
        var newTD7 = tr.insertCell();
        newTD7.style.borderColor = "dimgray";
        newTD7.style.textAlign = "right";
        newTD7.innerHTML = (Math.round(qResults[i].PercentCompleted));
        var newTD8 = tr.insertCell();
        newTD8.style.borderColor = "dimgray";
        newTD8.style.textAlign = "right";
        newTD8.innerHTML = (Math.round(qResults[i].PlannedBudget.value).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' ' + qResults[i].PlannedBudget.currency);
        var newTD9 = tr.insertCell();
        newTD9.style.borderColor = "dimgray";
        newTD9.style.textAlign = "right";
        newTD9.innerHTML = (Math.round(qResults[i].actualcost.value).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' ' + qResults[i].actualcost.currency);
        var newTD10 = tr.insertCell();
        newTD10.style.borderColor = "dimgray";
        newTD10.style.textAlign = "right";
        newTD10.innerHTML = (qResults[i].RemainingEffort.value + ' ' + qResults[i].RemainingEffort.unit);

        document.getElementById("latestRisks").appendChild(tbl);
        
			}
      
    }
  });  
}


$( document ).ready(function() {
    /*General Training Docs*/
    //const trainingDocs = filesData.files.filter( function(doc){return doc.DocumentType.name == 'Training - ALL';});
    //Review logic to format out based on picklist values 

    const generalTraining = filesDataDescrUpdated.filter(function(doc){return doc.DocumentType.name == 'General';});
    const asmTrainingDocs = filesDataDescrUpdated.filter(function(doc){ return doc.DocumentType.name == 'ASM - PA';});
    const resourceTrainingDocs = filesDataDescrUpdated.filter(function(doc){ return doc.DocumentType.name == 'Resource';});
    const arBrandTrainingDocs = filesDataDescrUpdated.filter(function(doc){ return doc.DocumentType.name == 'AR-Brand Mktg';});
    const managerTrainingDocs = filesDataDescrUpdated.filter(function(doc){ return doc.DocumentType.name == 'Manager';});

    formatTables('GeneralTrainingDocs',generalTraining);
    formatTables('asmPATrainingDocs',asmTrainingDocs);
    formatTables('resourceTrainingDocs',resourceTrainingDocs);
    formatTables('arBrandTrainingDocs',arBrandTrainingDocs);
    formatTables('managerTrainingDocs',managerTrainingDocs);
  
  $( "li.home" ).click(function() {
    $('#masterSwitch').children().fadeOut();
    //$('#clickToggles').children().css('pointer-events','');
    //$('#managerTraining').toggle("fast","swing");
    //$('li.tools').css('pointer-events','none');
  });
  $( "li.projects" ).click(function() {
    $('#masterSwitch').children().hide();
    $('#clickToggles').children().css('pointer-events','');
    $('#projectModal').toggle("slow","swing");
    //$('body').css({'background':'#E0E5EC'});
    //$('li.projects').css('pointer-events','none');
  });
  $( "li.risks" ).click(function() {
    $('#masterSwitch').children().hide();
    $('#clickToggles').children().css('pointer-events','');
    $('#riskModal').toggle("slow","swing");
    //$('li.risks').css('pointer-events','none');
  });
  $( "li.issues" ).click(function() {
    $('#masterSwitch').children().hide();
    $('#clickToggles').children().css('pointer-events','');
    $('#issueModal').toggle("slow","swing");
    //$('li.issues').css('pointer-events','none');
  });
  $( "li.requests" ).click(function() {
    $('#masterSwitch').children().hide();
    $('#clickToggles').children().css('pointer-events','');
    $('#requestModal').toggle("slow","swing");
    //$('li.requests').css('pointer-events','none');
  });
  $( "li.tools" ).click(function() {
    $('#masterSwitch').children().hide();
    $('#clickToggles').children().css('pointer-events','');
    $('#managerTraining').toggle("slow","swing");
    //$('li.tools').css('pointer-events','none');
  });
});


function formatTables(elementID, filesArray){
  var i = 0;
  const elemID = `#${elementID}`
  for (i = 0; i < filesArray.length; i++) {
        $(elemID).append(`<tr><th scope="row">${i+1}</th><td><a href ="/Clarizen${filesArray[i].id}" target="_blank">${filesArray[i].Name}</a></td><td>${filesArray[i].description}</td></tr>`);
      }
}