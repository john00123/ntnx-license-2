
let steps = [
  { number: 1,
    step: 'Upload File'
  },
  { number: 2,
      step: 'Select Licenses'
  },
  { number: 3,
    step: 'Review and Apply'
  },
  ]


function listItem(data){
  return(
    `<p class='step pos${data.number}'> <span>${data.number}</span> ${data.step}</p>`
  )
}



//initial setup
$('aside').append(steps.map(steps => listItem(steps)));
$('.pos1 span').addClass('active-step');
