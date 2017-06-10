$(document).ready(function () {
    Site.run();

    render();
});

var masterEncoding = JSON.parse(
    '[{"acclimationPeriod":[{"data":{"value":""},"users":["3221","3128","3094"]},{"data":{"value":"Mice were fed one of four diets for 30 weeks"},"users":["3345"]},{"data":{"value":"15"},"users":["3103"]},{"data":{"value":"Feed them","disabled":true},"users":["3373"]},{"data":{"value":"","disabled":true},"users":["3241","3283","3308","3321","3328","3211"]},{"data":{"value":"2"},"users":["3219"]},{"data":{"value":"1 week"},"users":["3256"]},{"data":{"value":"The mice were fed one of four diets."},"users":["3122"]},{"data":{"value":"2 weeks"},"users":["3360"]}],"acclimationDuration":[{"data":{"value":""},"users":["3221","3128","3094"]},{"data":{"value":30},"users":["3345","3219","3283","3122","3328"]},{"data":{},"users":["3103"]},{"data":{"value":10},"users":["3373"]},{"data":{"value":"","disabled":true},"users":["3241","3308","3321","3211"]},{"data":{"value":1},"users":["3256"]},{"data":{"value":4},"users":["3360"]}],"ageAtStart":[{"data":{"value":""},"users":["3221","3128","3256"]},{"data":{"value":"","disabled":true},"users":["3345","3122","3360","3321"]},{"data":{"value":10},"users":["3103"]},{"data":{},"users":["3373","3241","3283"]},{"data":{"value":5},"users":["3219"]},{"data":{"value":105,"disabled":false},"users":["3308"]},{"data":{"value":15},"users":["3094"]},{"data":{"value":14},"users":["3328"]},{"data":{"value":105},"users":["3211"]}],"ageAtWeight":[{"data":{"value":""},"users":["3221","3128"]},{"data":{"value":"","disabled":true},"users":["3345","3122","3360","3321"]},{"data":{"value":7},"users":["3103"]},{"data":{},"users":["3373","3219","3283"]},{"data":{"disabled":true},"users":["3241"]},{"data":{"value":30},"users":["3256"]},{"data":{"value":210},"users":["3308","3211"]},{"data":{"value":25},"users":["3094"]},{"data":{"value":17},"users":["3328"]}],"facilityName":[{"data":{"value":"The University of New Mexico"},"users":["3221"]},{"data":{"value":"Jackson Laboratory"},"users":["3345"]},{"data":{"value":"The University of New Mexico Health Sciences Center Animal Resources Facility according to Institutional Animal Care and Use Committee"},"users":["3103"]},{"data":{"value":"School of medicine"},"users":["3373"]},{"data":{"value":"The university of new mexico"},"users":["3128"]},{"data":{"value":"The University of New Mexico Health Sciences Center Animal Resources Facility"},"users":["3241","3256","3283","3122","3308"]},{"data":{"value":"Jackson Laboratory","disabled":false},"users":["3219"]},{"data":{"value":""},"users":["3094"]},{"data":{"value":"","disabled":true},"users":["3360","3321"]},{"data":{"value":"The University of Nee Mexico Health and Science Center"},"users":["3328"]},{"data":{"value":"t The University of New Mexico Health Sciences Center Animal Resources Facility"},"users":["3211"]}],"facilityCityState":[{"data":{"value":"New mexico"},"users":["3221"]},{"data":{"value":"New Mexico"},"users":["3345","3241","3256","3211"]},{"data":{"value":"New Brunswick, NJ"},"users":["3103","3360"]},{"data":{"value":"Albuquerque, New Mexico"},"users":["3373","3328"]},{"data":{"value":"Albuquerque NM"},"users":["3128"]},{"data":{"value":"Bar Harbor, ME","disabled":false},"users":["3219"]},{"data":{"value":"","disabled":true},"users":["3283","3122","3321"]},{"data":{"value":"Albuquerque,NM"},"users":["3308"]},{"data":{"value":""},"users":["3094"]}],"facilityCountry":[{"data":{"value":"united States"},"users":["3221"]},{"data":{"value":"United States"},"users":["3345","3103","3128","3241","3328"]},{"data":{"value":"USA"},"users":["3373","3219","3256","3308","3360","3211"]},{"data":{"value":"Ubited States","disabled":false},"users":["3283"]},{"data":{"value":"","disabled":true},"users":["3122","3321"]},{"data":{"value":""},"users":["3094"]}],"animalLocations":[{"data":{"value":"field.falseOption"},"users":["3221","3345","3103","3373","3128","3241","3219","3256","3283","3122","3308","3360","3328","3211"]},{"data":{"value":""},"users":["3094"]},{"data":{"value":"","disabled":true},"users":["3321"]}],"pathogenFreeEnvironment":[{"data":{"value":"Completely germ-free"},"users":["3221","3373","3360","3328"]},{"data":{"value":"Specific pathogen-free"},"users":["3345","3103","3128","3219","3256"]},{"data":{"value":"","disabled":true},"users":["3241","3283","3122","3321","3211"]},{"data":{"value":"Not germ free"},"users":["3308"]},{"data":{"value":""},"users":["3094"]}],"cageType":[{"data":{"value":""},"users":["3221","3128","3094"]},{"data":{"value":"","disabled":true},"users":["3345","3241","3283","3122","3308","3360","3321","3211"]},{"data":{"value":"Polycarbonate cages"},"users":["3103","3373"]},{"data":{"value":"Other"},"users":["3219"]},{"data":{"value":"Soft filter-top cages"},"users":["3256"]},{"data":{"value":"Open cages"},"users":["3328"]}],"airCirculation":[{"data":{"value":""},"users":["3221","3128","3094"]},{"data":{"value":"","disabled":true},"users":["3345","3241","3219","3283","3122","3308","3360","3321","3211"]},{"data":{"value":"filter top cages"},"users":["3103"]},{"data":{"value":"ventilated cages"},"users":["3373"]},{"data":{"value":"filter top"},"users":["3256"]},{"data":{"value":"Open top cage"},"users":["3328"]}],"beddingMaterial":[{"data":{"value":""},"users":["3221","3128","3094"]},{"data":{"value":"","disabled":true},"users":["3345","3241","3219","3283","3122","3308","3360","3321","3328","3211"]},{"data":{"value":"wood chips"},"users":["3103","3373","3256"]}],"changeFrequency":[{"data":{"value":""},"users":["3221","3128","3094"]},{"data":{"value":"","disabled":true},"users":["3345","3241","3219","3283","3122","3308","3360","3321","3211"]},{"data":{"value":7},"users":["3103","3373"]},{"data":{"value":1},"users":["3256"]},{"data":{},"users":["3328"]}],"enrichmentType":[{"data":{"value":""},"users":["3221","3128","3094"]},{"data":{"value":"","disabled":true},"users":["3345","3241","3283","3122","3308","3360","3321","3211"]},{"data":{"value":"nylabone"},"users":["3103"]},{"data":{"value":"wheel"},"users":["3373"]},{"data":{"value":"Was not stated."},"users":["3219"]},{"data":{"value":"paper squares"},"users":["3256"]},{"data":{"value":"Cardboard"},"users":["3328"]}],"lightingSchedule":[{"data":{"value":""},"users":["3221","3128","3094"]},{"data":{"value":"field.falseOption"},"users":["3345","3373","3122","3308","3328"]},{"data":{"value":"field.trueOption"},"users":["3103","3219","3256","3283","3360"]},{"data":{"value":"","disabled":true},"users":["3241","3321","3211"]}],"lightHours":[{"data":{"value":""},"users":["3221","3128","3094"]},{"data":{"value":12},"users":["3345","3373","3219","3256","3283","3122","3308","3360","3211"]},{"data":{"value":13},"users":["3103"]},{"data":{"value":"","disabled":true},"users":["3241","3321"]},{"data":{"value":14},"users":["3328"]}],"darkHours":[{"data":{"value":""},"users":["3221","3128","3094"]},{"data":{"value":12},"users":["3345","3373","3219","3256","3283","3122","3308","3360","3211"]},{"data":{"value":8},"users":["3103"]},{"data":{"value":"","disabled":true},"users":["3241","3321"]},{"data":{"value":18},"users":["3328"]}],"lightStartTime":[{"data":{"value":""},"users":["3221","3128","3094","3360"]},{"data":{"value":"","disabled":true},"users":["3345","3241","3283","3122","3308","3321","3211"]},{"data":{"value":4},"users":["3103"]},{"data":{"value":500},"users":["3373"]},{"data":{"value":800},"users":["3219"]},{"data":{"value":600},"users":["3256"]},{"data":{},"users":["3328"]}],"facilityHumidity":[{"data":{"value":""},"users":["3221","3094"]},{"data":{"upperValue":32,"value":"","lowerValue":31},"users":["3345","3103","3241","3219","3122","3308","3360","3211"]},{"data":{"upperValue":74,"value":"","lowerValue":0},"users":["3373"]},{"data":{"upperValue":24,"value":"","lowerValue":23},"users":["3128"]},{"data":{"upperValue":42,"value":"","lowerValue":0},"users":["3256"]},{"data":{"upperValue":32,"value":"","disabled":false,"lowerValue":32},"users":["3283"]},{"data":{"value":"","disabled":true},"users":["3321"]},{"data":{"upperValue":59,"value":"","lowerValue":0},"users":["3328"]}],"constantTemperature":[{"data":{"value":""},"users":["3221","3094"]},{"data":{"value":"field.falseOption"},"users":["3345","3103","3373","3128","3308","3328"]},{"data":{"value":"field.trueOption"},"users":["3241","3219","3256","3283","3122","3360","3211"]},{"data":{"value":"","disabled":true},"users":["3321"]}],"temperatureRange":[{"data":{"value":""},"users":["3221","3256","3094"]},{"data":{"upperValue":24,"value":"","lowerValue":23},"users":["3345","3241","3283","3122","3308","3360","3211"]},{"data":{"upperValue":22,"value":"","lowerValue":21},"users":["3103"]},{"data":{"upperValue":45,"value":"","lowerValue":0},"users":["3373"]},{"data":{"upperValue":32,"value":"","lowerValue":31},"users":["3128"]},{"data":{"upperValue":24,"value":"","lowerValue":21},"users":["3219"]},{"data":{"value":"","disabled":true},"users":["3321"]},{"data":{"upperValue":60,"value":"","lowerValue":14},"users":["3328"]}],"dietType":[{"data":{"value":""},"users":["3221"]},{"data":{"value":"Low and High fat diets"},"users":["3345"]},{"data":{"value":"high fat diet"},"users":["3103","3128"]},{"data":{"value":"Low fat and High fat"},"users":["3373"]},{"data":{"value":"Low- fat diet, high-fat diet supplemented with lard, a high-fat diet supplemented with fish oil, or a high-fat diet supplemented with olive oil"},"users":["3241"]},{"data":{"value":"There were four different diets."},"users":["3219"]},{"data":{"value":"low fat"},"users":["3256"]},{"data":{"value":"low- fat and high-fat"},"users":["3283"]},{"data":{"value":"Low fat diet and high fat diet"},"users":["3122"]},{"data":{"value":"a low-fat diet, a high-fat diet supplemented with lard, a high-fat diet supplemented with fish oil, or a high-fat diet supplemented with olive oil"},"users":["3308"]},{"data":{"value":"High-fat diet"},"users":["3094"]},{"data":{"value":"low fat diet"},"users":["3360"]},{"data":{"value":"","disabled":true},"users":["3321"]},{"data":{"value":"Low-fat diet, high-fat diet supplemented with olive oil, High-fat diet supplemented with lard, High-fat diet supplemented with fish oil, and high-fat diet supplemented with"},"users":["3328"]},{"data":{"value":"HF with lard"},"users":["3211"]}],"dietID":[{"data":{"value":""},"users":["3221"]},{"data":{"value":"D07021301"},"users":["3345"]},{"data":{"value":"C57BL\/6J"},"users":["3103","3094","3328"]},{"data":{"value":"674GL1"},"users":["3373"]},{"data":{"value":"C57BL"},"users":["3128"]},{"data":{"value":"D07021301, HF, D07021302, FO, D07021303), OO, D07021304)"},"users":["3241"]},{"data":{"value":"IACUC"},"users":["3219"]},{"data":{"value":"D12451"},"users":["3256"]},{"data":{"value":"D0702130, D07021302,D07021303,D07021304"},"users":["3283"]},{"data":{"value":"","disabled":true},"users":["3122","3321"]},{"data":{"value":"(LF, D07021301),(HF, D07021302),(FO, D07021303),(OO, D07021304)","disabled":false},"users":["3308"]},{"data":{"value":"LF, D07021301"},"users":["3360"]},{"data":{"value":"D07021302"},"users":["3211"]}],"dietVendor":[{"data":{"value":""},"users":["3221"]},{"data":{"value":"Research Diets"},"users":["3345","3128","3241","3256","3283","3122","3211"]},{"data":{"value":"Biotech Comapny"},"users":["3103"]},{"data":{"value":"Jackson Laboratory"},"users":["3373"]},{"data":{"value":"The University of New Mexico Health Sciences Center Animal Resources Facility according to Institutional Animal Care and Use Committee"},"users":["3219"]},{"data":{"value":"Research Diets","disabled":false},"users":["3308"]},{"data":{"value":"","disabled":true},"users":["3094","3360","3321"]},{"data":{"value":"The University of New Mexico Health and Science Center","disabled":false},"users":["3328"]}],"dietVendorCity":[{"data":{"value":""},"users":["3221"]},{"data":{"value":"New Brunswick, NJ"},"users":["3345","3128","3241","3256","3283","3122","3211"]},{"data":{"value":"Bar Harbor, ME"},"users":["3103"]},{"data":{"value":"Burbank, California"},"users":["3373"]},{"data":{"value":"The University of New Mexico Health Sciences Center Animal Resources Facility according to Institutional Animal Care and Use Committee"},"users":["3219"]},{"data":{"value":"New Brunswick, NJ","disabled":false},"users":["3308"]},{"data":{"value":"","disabled":true},"users":["3094","3321"]},{"data":{"value":"New Brunkswick, NJ"},"users":["3360"]},{"data":{"value":"Albuquerque, New Mexico"},"users":["3328"]}],"feedingFrequency":[{"data":{"value":""},"users":["3221"]},{"data":{"value":"Fixed"},"users":["3345","3094"]},{"data":{"value":"Ad libitum"},"users":["3103","3128","3241","3219","3256","3283","3122","3360","3328","3211"]},{"data":{"value":"Paired"},"users":["3373"]},{"data":{"value":"Ad libitum","disabled":false},"users":["3308"]},{"data":{"value":"","disabled":true},"users":["3321"]}],"percentEnergy":[{"data":{"value":""},"users":["3221"]},{"data":{"value":"field.falseOption"},"users":["3345","3219","3308","3094","3360","3328","3211"]},{"data":{"value":"field.trueOption"},"users":["3103","3373","3128","3256","3283"]},{"data":{"value":"","disabled":true},"users":["3241","3122","3321"]}],"percentFat":[{"data":{"value":""},"users":["3221"]},{"data":{"value":4},"users":["3345","3308"]},{"data":{"value":11},"users":["3103"]},{"data":{"value":50},"users":["3373"]},{"data":{"value":45},"users":["3128"]},{"data":{"value":75},"users":["3241","3211"]},{"data":{"value":30},"users":["3219"]},{"data":{"value":10},"users":["3256","3283","3328"]},{"data":{"value":"","disabled":true},"users":["3122","3094","3360","3321"]}],"percentCarbohydrates":[{"data":{"value":""},"users":["3221"]},{"data":{"value":67},"users":["3345"]},{"data":{"value":9},"users":["3103"]},{"data":{"value":24},"users":["3373"]},{"data":{"value":35},"users":["3128"]},{"data":{"value":"","disabled":true},"users":["3241","3122","3094","3360","3321","3211"]},{"data":{"value":60},"users":["3219"]},{"data":{"value":10},"users":["3256"]},{"data":{"value":70},"users":["3283"]},{"data":{"value":67,"disabled":false},"users":["3308"]},{"data":{"value":30},"users":["3328"]}],"percentProtein":[{"data":{"value":""},"users":["3221"]},{"data":{"value":19},"users":["3345"]},{"data":{"value":5},"users":["3103"]},{"data":{"value":25},"users":["3373"]},{"data":{"value":20},"users":["3128","3283"]},{"data":{"value":"","disabled":true},"users":["3241","3122","3094","3360","3321","3211"]},{"data":{"value":10},"users":["3219","3256"]},{"data":{"value":19,"disabled":false},"users":["3308"]},{"data":{"value":40},"users":["3328"]}],"exerciseType":[{"data":{"value":""},"users":["3221","3128","3094"]},{"data":{"value":"","disabled":true},"users":["3345","3241","3219","3283","3122","3308","3360","3321","3211"]},{"data":{"value":"wheel"},"users":["3103","3373"]},{"data":{"value":"hamster wheel"},"users":["3256"]},{"data":{"value":"Running"},"users":["3328"]}],"exerciseFreq":[{"data":{"value":""},"users":["3221","3128","3094"]},{"data":{"value":"","disabled":true},"users":["3345","3241","3283","3122","3308","3321","3211"]},{"data":{"value":"Daily"},"users":["3103","3219","3328"]},{"data":{"value":"2-4 times per month"},"users":["3373","3360"]},{"data":{"value":"Less frequently than monthly"},"users":["3256"]}],"forcedExcecise":[{"data":{"value":""},"users":["3221","3128","3094"]},{"data":{"value":"","disabled":true},"users":["3345","3241","3283","3122","3308","3321","3211"]},{"data":{"value":"field.falseOption"},"users":["3103","3373","3219","3256","3360","3328"]}],"daysOnTreatment":[{"data":{"value":""},"users":["3221","3094"]},{"data":{"value":30},"users":["3345","3128","3241","3256","3283","3122","3308","3328"]},{"data":{"value":14},"users":["3103"]},{"data":{"value":26},"users":["3373"]},{"data":{},"users":["3219","3360"]},{"data":{"value":"","disabled":true},"users":["3321","3211"]}],"vendorName":[{"data":{"value":""},"users":["3221","3094"]},{"data":{"value":"Jackson Laboratory"},"users":["3345","3373","3211"]},{"data":{"value":"Research Diets"},"users":["3103"]},{"data":{"value":"The Jackson Laboratory"},"users":["3128","3241","3219","3256","3122","3360"]},{"data":{"value":"The Jackson Labratory"},"users":["3283"]},{"data":{"value":"The Jackson Laboratory (Bar Harbor, ME","disabled":false},"users":["3308"]},{"data":{"value":"","disabled":true},"users":["3321"]},{"data":{"value":"The University of New Mexico Health and Science Center"},"users":["3328"]}],"miceVendorCity":[{"data":{"value":""},"users":["3221","3094"]},{"data":{"value":"New Mexico"},"users":["3345"]},{"data":{"value":"New Brunswick, NJ"},"users":["3103"]},{"data":{"value":"Burbank, California"},"users":["3373"]},{"data":{"value":"Bar Harbor"},"users":["3128"]},{"data":{"value":"Bar Harbor, ME"},"users":["3241","3219","3122","3360","3211"]},{"data":{"value":"Bar Harbor,ME"},"users":["3256"]},{"data":{"value":"Bar Harbor, NE"},"users":["3283"]},{"data":{"value":"(Bar Harbor, ME)","disabled":false},"users":["3308"]},{"data":{"value":"","disabled":true},"users":["3321"]},{"data":{"value":"Albequerque, New Mexico"},"users":["3328"]}],"vendorCountry":[{"data":{"value":""},"users":["3221","3094"]},{"data":{"value":"United States"},"users":["3345","3103","3241","3283","3328"]},{"data":{"value":"USA"},"users":["3373","3256","3360","3211"]},{"data":{"value":"Bar Harbor, ME"},"users":["3128"]},{"data":{"value":"The Jackson Laboratory"},"users":["3219"]},{"data":{"value":"","disabled":true},"users":["3122","3321"]},{"data":{"value":"United States","disabled":false},"users":["3308"]}],"sex":[{"data":{"value":""},"users":["3221","3094"]},{"data":{"value":"Male"},"users":["3345","3103","3128","3241","3256","3283","3122","3308","3360","3211"]},{"data":{"value":"Mixture"},"users":["3373","3219"]},{"data":{"value":"","disabled":true},"users":["3321"]},{"data":{"value":"Female"},"users":["3328"]}],"breed":[{"data":{"value":""},"users":["3221","3094"]},{"data":{"value":"C57BL\/6J"},"users":["3345","3103","3373","3128","3241","3219","3256","3283","3122","3308","3211"]},{"data":{"value":"","disabled":true},"users":["3360","3321"]},{"data":{"value":"C57BL\/6J","disabled":false},"users":["3328"]}],"surgeryType":[{"data":{"value":""},"users":["3221","3128","3094"]},{"data":{"value":"","disabled":true},"users":["3345","3241","3283","3122","3308","3360","3321","3211"]},{"data":{"value":"cardiac stent"},"users":["3103"]},{"data":{"value":"NA"},"users":["3373"]},{"data":{"value":"none"},"users":["3219"]},{"data":{"value":"gastric bypass"},"users":["3256"]},{"data":{"value":"Gastric bypass"},"users":["3328"]}],"routeOfAdministration":[{"data":{"value":""},"users":["3221","3128","3094"]},{"data":{"value":"Water"},"users":["3345","3103","3373","3219"]},{"data":{"value":"Food"},"users":["3241","3328"]},{"data":{"value":"Injected"},"users":["3256","3308","3360"]},{"data":{"value":"","disabled":true},"users":["3283","3122","3321","3211"]}],"compoundName":[{"data":{"value":""},"users":["3221","3128","3094"]},{"data":{"value":"fish oil"},"users":["3345"]},{"data":{"value":"glucose"},"users":["3103","3373","3256"]},{"data":{"value":"","disabled":true},"users":["3241","3219","3283","3122","3308","3321","3211"]},{"data":{"value":"ad litbum"},"users":["3360"]},{"data":{"value":"Sucrose"},"users":["3328"]}],"compoundFrequency":[{"data":{"value":""},"users":["3221","3128","3094"]},{"data":{"value":"Continuously (such as in water)"},"users":["3345","3241","3219"]},{"data":{"value":"Daily"},"users":["3103","3328"]},{"data":{"value":"Weekly"},"users":["3373"]},{"data":{"value":"Multiple times per day"},"users":["3256"]},{"data":{"value":"","disabled":true},"users":["3283","3122","3308","3321","3211"]},{"data":{"value":"2-4 times per month"},"users":["3360"]}],"dosage":[{"data":{"value":""},"users":["3221","3128","3094"]},{"data":{"value":"","disabled":true},"users":["3345","3373","3241","3219","3283","3122","3308","3360","3321","3211"]},{"data":{"value":"45% kcal"},"users":["3103"]},{"data":{"value":"3mg\/kg"},"users":["3256"]},{"data":{"value":"30%","disabled":false},"users":["3328"]}],"geneticManipulationType":[{"data":{"value":""},"users":["3221","3128","3094"]},{"data":{"value":"","disabled":true},"users":["3345","3241","3219","3256","3122","3308","3360","3321","3211"]},{"data":{"value":"45% kcal"},"users":["3103"]},{"data":{"value":"N\/A"},"users":["3373"]},{"data":{"value":"otal RNA was extracted from mouse livers using the RNeasy Mini Kit and treated with RNasefree DNase to remove contaminating DNA"},"users":["3283"]},{"data":{"value":"The DNA was changed"},"users":["3328"]}],"ethicalStatement":[{"data":{"value":""},"users":["3221","3094"]},{"data":{"value":"field.trueOption"},"users":["3345","3103","3373","3128","3241","3219","3256","3283","3308","3360","3211"]},{"data":{"value":"field.falseOption"},"users":["3122"]},{"data":{"value":"","disabled":true},"users":["3321","3328"]}],"micePerCage":[{"data":{"value":""},"users":["3221","3094"]},{"data":{"value":4},"users":["3345","3128","3256","3283","3122","3308","3360","3328","3211"]},{"data":{"value":25},"users":["3103"]},{"data":{"value":10},"users":["3373"]},{"data":{"value":"","disabled":true},"users":["3241","3321"]},{"data":{"value":9},"users":["3219"]}],"sampleSize":[{"data":{"value":""},"users":["3221","3128","3094"]},{"data":{"value":"","disabled":true},"users":["3345","3241","3283","3122","3308","3321","3211"]},{"data":{"value":4},"users":["3103","3219","3256","3360"]},{"data":{"value":200},"users":["3373"]},{"data":{},"users":["3328"]}],"whereReported":[{"data":{"value":""},"users":["3221","3128","3094"]},{"data":{"value":"","disabled":true},"users":["3345","3122","3360","3321"]},{"data":{"value":"A table with numbers"},"users":["3103","3241","3256","3283","3308","3211"]},{"data":{"value":"Mentioned generally in the text"},"users":["3373"]},{"data":{"value":"In a figure"},"users":["3219"]},{"data":{"value":"Text, with numbers reported"},"users":["3328"]}],"averageFinalWeight":[{"data":{"value":""},"users":["3221","3128","3094"]},{"data":{"value":"","disabled":true},"users":["3345","3241","3283","3122","3308","3360","3321","3328"]},{"data":{"value":4},"users":["3103"]},{"data":{"value":14},"users":["3373"]},{"data":{"value":15},"users":["3219","3256"]},{"data":{"value":46.7},"users":["3211"]}],"errorOfMeasurmentValue":[{"data":{"value":""},"users":["3221","3128","3094"]},{"data":{"value":"","disabled":true},"users":["3345","3241","3122","3308","3360","3321","3211"]},{"data":{"value":18},"users":["3103"]},{"data":{"value":15},"users":["3373"]},{"data":{},"users":["3219","3283","3328"]},{"data":{"value":22},"users":["3256"]}],"errorOfMeasurmentType":[{"data":{"value":""},"users":["3221","3128","3094"]},{"data":{"value":"","disabled":true},"users":["3345","3241","3122","3360","3321"]},{"data":{"value":"Standard Error or Standard Error of the Mean (s.e. of S.E.M."},"users":["3103","3373","3211"]},{"data":{"value":"Standard Deviation (S.D. or s.d.)"},"users":["3219","3256","3283","3328"]},{"data":{"value":"Standard Error or Standard Error of the Mean (s.e. of S.E.M.","disabled":false},"users":["3308"]}]}]'
)[0];



function render(){
    var wrapper = document.querySelector("#question-wrapper");
    var questionTemplate = document.querySelector("#question-template");
    var responseTemplate = document.querySelector("#question-response-li");

    for (var property in masterEncoding) {
        if (masterEncoding.hasOwnProperty(property)) {
            var content = masterEncoding[property];

            questionTemplate.content.querySelector("[data-question-name]").textContent = property;
            var ul = questionTemplate.content.querySelector("[data-response-ul]");
            while (ul.hasChildNodes()) {
                ul.removeChild(ul.lastChild);
            }

            for( var j = 0; j < content.length; j++ ){
                var response = content[j].data.value;
                if( content[j].data.disabled && content[j].data.value == ""){
                    response = "Not Reported";
                } else if ( content[j].data.value == "" ){
                    response = "________________";
                }
                var users = content[j].users;

                responseTemplate.content.querySelector("[data-response-content").textContent = response;
                responseTemplate.content.querySelector("[data-response-users").textContent = JSON.stringify( users );

                var responseClone = responseTemplate.content.cloneNode( true );
                ul.append( responseClone );
            }

            var clone = questionTemplate.content.cloneNode( true );

            // responseTemplate.content.querySelector("[data-response-content").textContent

            wrapper.appendChild( clone );

        }
    }

}