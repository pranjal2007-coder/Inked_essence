document.getElementById('recommendBtn').addEventListener('click', function() {
    const gender = document.getElementById('gender').value;
    const occasion = document.getElementById('occasion').value;
    const resultDiv = document.getElementById('result');

    let recommendation = '';

    if (!gender || !occasion) {
        resultDiv.innerText = 'Please select both gender and occasion to get a style recommendation.';
        return;
    }

    const outfits = {
        male: {
            date_night: [
                'A fitted shirt, dark jeans, and loafers.',
                'A stylish blazer over a t-shirt with chinos.',
                'A casual button-up shirt with tailored shorts and sandals.'
            ],
            girls_night_out: ['N/A (This occasion is typically for females)'],
            brunch: [
                'A casual button-up shirt with chinos and sneakers.',
                'A light sweater with jeans and loafers.',
                'A polo shirt with shorts and boat shoes.'
            ],
            cocktail_party: [
                'A blazer, dress shirt, and dress pants.',
                'A stylish suit with a tie and dress shoes.',
                'A smart casual outfit with a fitted shirt and tailored trousers.'
            ],
            wedding_guest: [
                'A suit with a tie and polished shoes.',
                'A smart blazer with dress pants and a dress shirt.',
                'A tailored vest with slacks and a crisp shirt.'
            ],
            birthday_bash: [
                'A stylish t-shirt with jeans and casual shoes.',
                'A short-sleeve button-up with chinos.',
                'A graphic tee with joggers and sneakers.'
            ],
            nightclub: [
                'A trendy shirt with slim-fit pants and stylish shoes.',
                'A leather jacket over a fitted tee with dark jeans.',
                'A casual button-up with tailored shorts and loafers.'
            ],
            office: [
                'A dress shirt, slacks, and dress shoes.',
                'A smart blazer with a fitted shirt and chinos.',
                'A polo shirt with dress pants and loafers.'
            ],
            job_interview: [
                'A tailored suit with a tie and dress shoes.',
                'A smart blazer with a dress shirt and slacks.',
                'A fitted shirt with dress pants and a blazer.'
            ],
            business_casual: [
                'A polo shirt with chinos and loafers.',
                'A button-up shirt with dress pants and a blazer.',
                'A smart sweater over a collared shirt with slacks.'
            ],
            power_dressing: [
                'A sharp suit with a crisp shirt and tie.',
                'A tailored blazer with dress pants and a fitted shirt.',
                'A vest with a dress shirt and slacks.'
            ],
            work_from_home: [
                'Comfortable joggers and a casual t-shirt.',
                'A cozy sweater with sweatpants.',
                'A relaxed fit shirt with shorts.'
            ],
            beach_vacation: [
                'Swim trunks and a casual tank top.',
                'A short-sleeve shirt with board shorts.',
                'A lightweight linen shirt with shorts.'
            ],
            city_break: [
                'A casual shirt with shorts and comfortable shoes.',
                'A light jacket over a t-shirt with jeans.',
                'A stylish hoodie with joggers.'
            ],
            airport_look: [
                'Joggers, a t-shirt, and a light jacket.',
                'Comfortable jeans with a hoodie and sneakers.',
                'Athletic pants with a casual shirt.'
            ],
            road_trip: [
                'Comfortable jeans and a breathable t-shirt.',
                'Cargo shorts with a casual button-up.',
                'A lightweight jacket with a graphic tee.'
            ],
            cruise_style: [
                'Shorts and a light button-up shirt.',
                'A casual t-shirt with swim trunks.',
                'A stylish tank top with board shorts.'
            ],
            mountain_escape: [
                'Hiking pants and a moisture-wicking shirt.',
                'A flannel shirt with cargo shorts.',
                'A lightweight jacket with hiking boots.'
            ],
            spring_refresh: [
                'Lightweight trousers and a short-sleeve shirt.',
                'A casual blazer with chinos and a t-shirt.',
                'A floral shirt with shorts.'
            ],
            summer_heatwave: [
                'Shorts and a tank top.',
                'A lightweight linen shirt with chinos.',
                'A short-sleeve button-up with cargo shorts.'
            ],
            autumn_layers: [
                'Jeans, a t-shirt, and a light jacket.',
                'A sweater with chinos and boots.',
                'A flannel shirt with jeans and a jacket.'
            ],
            winter_wonderland: [
                'Warm layers, including a sweater and coat.',
                'A thermal shirt with a puffer jacket and jeans.',
                'A stylish scarf with a wool coat and boots.'
            ],
            christmas_party: [
                'Festive sweater with dress pants.',
                'A smart blazer with a holiday-themed shirt.',
                'A tailored suit with a festive tie.'
            ],
            new_years_eve: [
                'A stylish suit with a bow tie.',
                'A fitted shirt with dress pants and a blazer.',
                'A trendy outfit with a sequined shirt and slacks.'
            ],
            festivals: [
                'Comfortable shorts and a graphic tee.',
                'A casual tank top with denim shorts.',
                'A lightweight shirt with cargo pants.'
            ],
            eid: [
                'Traditional attire or a smart casual outfit.',
                'A kurta with trousers and sandals.',
                'A tailored suit with a traditional touch.'
            ],
            gym: [
                'Athletic shorts and a moisture-wicking t-shirt.',
                'Joggers with a tank top and running shoes.',
                'A fitted t-shirt with gym shorts.'
            ],
            yoga: [
                'Yoga pants and a comfortable tank top.',
                'Leggings with a loose-fitting t-shirt.',
                'A sports bra with high-waisted leggings.'
            ],
            athleisure: [
                'Stylish joggers and a fitted hoodie.',
                'Leggings with a casual oversized sweater.',
                'Athletic shorts with a trendy crop top.'
            ],
            hiking: [
                'Cargo shorts and a breathable shirt.',
                'Hiking pants with a moisture-wicking top.',
                'A flannel shirt with comfortable hiking boots.'
            ],
            creative_studio: [
                'Casual jeans and a creative graphic tee.',
                'A comfortable oversized sweater with leggings.',
                'A stylish jumpsuit with sneakers.'
            ],
            comfy_home: [
                'Loungewear or pajamas.',
                'A cozy hoodie with sweatpants.',
                'A relaxed fit t-shirt with shorts.'
            ],
            errands: [
                'Casual shorts and a t-shirt.',
                'Comfortable jeans with a polo shirt.',
                'A light sweater with joggers.'
            ],
            rainy_day: [
                'Waterproof jacket and comfortable pants.',
                'A stylish raincoat with jeans and boots.',
                'A hoodie with waterproof pants.'
            ],
            minimalist: [
                'Simple t-shirt and jeans.',
                'A monochrome outfit with a fitted shirt and trousers.',
                'A casual button-up with chinos.'
            ],
            weekend: [
                'Casual wear like a hoodie and joggers.',
                'A relaxed fit shirt with shorts.',
                'Comfortable jeans with a graphic tee.'
            ],
            movie_night: [
                'Comfortable pajamas or loungewear.',
                'A cozy sweater with sweatpants.',
                'A relaxed fit t-shirt with joggers.'
            ],
            back_to_school: [
                'Casual jeans and a graphic tee.',
                'A stylish hoodie with joggers.',
                'A fitted shirt with shorts.'
            ],
            graduation: [
                'A smart dress shirt with slacks.',
                'A tailored suit with a graduation gown.',
                'A casual blazer with a fitted shirt and chinos.'
            ],
            first_date: [
                'A nice shirt with jeans and stylish shoes.',
                'A casual blazer over a t-shirt with chinos.',
                'A fitted polo with dress pants.'
            ],
            photoshoot: [
                'Trendy outfit that reflects your style.',
                'A stylish dress shirt with tailored trousers.',
                'A casual yet chic outfit with layers.'
            ],
            family_gatherings: [
                'Smart casual attire.',
                'A comfortable sweater with jeans.',
                'A tailored shirt with chinos.'
            ],
            baby_shower: [
                'A nice dress shirt with chinos.',
                'A smart blazer with a casual shirt.',
                'A relaxed fit shirt with dress pants.'
            ]
        },
        female: {
            date_night: [
                'A chic dress or a stylish top with a skirt and heels.',
                'A fitted blouse with high-waisted jeans and ankle boots.',
                'A stylish jumpsuit with statement earrings.'
            ],
            girls_night_out: [
                'A trendy outfit with a stylish top and skinny jeans.',
                'A fun mini dress with strappy heels.',
                'A stylish crop top with a high-waisted skirt.'
            ],
            brunch: [
                'A casual sundress or a blouse with jeans and flats.',
                'A light sweater with a skirt and ankle boots.',
                'A stylish top with tailored shorts and sandals.'
            ],
            cocktail_party: [
                'An elegant cocktail dress with heels.',
                'A fitted midi dress with a stylish clutch.',
                'A chic jumpsuit with statement jewelry.'
            ],
            wedding_guest: [
                'A beautiful dress or a classy jumpsuit with accessories.',
                'A floral maxi dress with sandals.',
                'A fitted dress with a shawl and heels.'
            ],
            birthday_bash: [
                'A fun and colorful outfit with a statement piece.',
                'A stylish top with a flared skirt and ankle boots.',
                'A trendy dress with bold accessories.'
            ],
            nightclub: [
                'A stylish mini dress or a trendy top with a leather skirt.',
                'A fitted bodysuit with high-waisted jeans and heels.',
                'A sequined top with a pencil skirt.'
            ],
            office: [
                'A tailored blouse with dress pants or a pencil skirt.',
                'A smart blazer with a fitted dress.',
                'A button-up shirt with tailored trousers.'
            ],
            job_interview: [
                'A professional blazer with a blouse and slacks.',
                'A fitted dress with a blazer and closed-toe shoes.',
                'A smart blouse with a pencil skirt and heels.'
            ],
            business_casual: [
                'A smart blouse with tailored trousers or a skirt.',
                'A fitted sweater with dress pants and loafers.',
                'A casual blazer with a t-shirt and jeans.'
            ],
            power_dressing: [
                'A sharp suit with a fitted blouse and heels.',
                'A tailored blazer with a pencil skirt and a blouse.',
                'A stylish dress with a structured jacket.'
            ],
            work_from_home: [
                'Comfortable loungewear or a casual outfit.',
                'A cozy sweater with leggings.',
                'A relaxed fit t-shirt with joggers.'
            ],
            beach_vacation: [
                'A stylish swimsuit with a cover-up and sandals.',
                'A light sundress with a wide-brimmed hat.',
                'A tankini with board shorts and flip-flops.'
            ],
            city_break: [
                'A casual dress or shorts with a trendy top.',
                'A light jacket over a t-shirt with jeans.',
                'A stylish jumpsuit with comfortable shoes.'
            ],
            airport_look: [
                'Comfortable leggings and a stylish oversized sweater.',
                'A casual dress with a denim jacket.',
                'Joggers with a fitted top and sneakers.'
            ],
            road_trip: [
                'Casual shorts and a comfortable t-shirt.',
                'A lightweight jacket with a graphic tee.',
                'A relaxed fit dress with sandals.'
            ],
            cruise_style: [
                'A light sundress or shorts with a breezy top.',
                'A stylish tank top with a maxi skirt.',
                'A casual outfit with a wide-brimmed hat.'
            ],
            mountain_escape: [
                'Hiking pants and a moisture-wicking top.',
                'A flannel shirt with leggings and hiking boots.',
                'A lightweight jacket with a tank top and shorts.'
            ],
            spring_refresh: [
                'A floral dress or light trousers with a blouse.',
                'A casual blazer with a fitted top and jeans.',
                'A stylish skirt with a light sweater.'
            ],
            summer_heatwave: [
                'A breezy sundress or shorts with a tank top.',
                'A lightweight linen shirt with a skirt.',
                'A casual outfit with a crop top and high-waisted shorts.'
            ],
            autumn_layers: [
                'Jeans, a cozy sweater, and a light jacket.',
                'A stylish scarf with a fitted top and jeans.',
                'A flannel shirt with leggings and ankle boots.'
            ],
            winter_wonderland: [
                'Warm layers, including a stylish coat and scarf.',
                'A thermal top with a puffer jacket and jeans.',
                'A chic sweater dress with knee-high boots.'
            ],
            christmas_party: [
                'A festive dress or a stylish top with a skirt.',
                'A cozy sweater with a sequined skirt.',
                'A tailored dress with holiday-themed accessories.'
            ],
            new_years_eve: [
                'A glamorous dress with sparkling accessories.',
                'A fitted top with a sequined skirt and heels.',
                'A stylish jumpsuit with statement jewelry.'
            ],
            festivals: [
                'Comfortable shorts and a fun graphic tee.',
                'A casual tank top with denim shorts.',
                'A lightweight shirt with a flowy skirt.'
            ],
            eid: [
                'Traditional attire or a stylish dress.',
                'A beautiful kurta with palazzo pants.',
                'A fitted dress with elegant accessories.'
            ],
            gym: [
                'Leggings and a comfortable tank top.',
                'Yoga pants with a loose-fitting t-shirt.',
                'A sports bra with high-waisted leggings.'
            ],
            yoga: [
                'Yoga pants and a comfortable tank top.',
                'Leggings with a loose-fitting t-shirt.',
                'A fitted sports bra with capri leggings.'
            ],
            athleisure: [
                'Stylish joggers and a fitted hoodie.',
                'Leggings with a casual oversized sweater.',
                'Athletic shorts with a trendy crop top.'
            ],
            hiking: [
                'Cargo shorts and a breathable shirt.',
                'Hiking pants with a moisture-wicking top.',
                'A flannel shirt with comfortable hiking boots.'
            ],
            creative_studio: [
                'Casual jeans and a creative graphic tee.',
                'A comfortable oversized sweater with leggings.',
                'A stylish jumpsuit with sneakers.'
            ],
            comfy_home: [
                'Loungewear or pajamas.',
                'A cozy hoodie with sweatpants.',
                'A relaxed fit t-shirt with shorts.'
            ],
            errands: [
                'Casual shorts and a t-shirt.',
                'Comfortable jeans with a polo shirt.',
                'A light sweater with joggers.'
            ],
            rainy_day: [
                'Waterproof jacket and comfortable pants.',
                'A stylish raincoat with jeans and boots.',
                'A hoodie with waterproof pants.'
            ],
            minimalist: [
                'Simple dress or a top with jeans.',
                'A monochrome outfit with a fitted shirt and trousers.',
                'A casual button-up with chinos.'
            ],
            weekend: [
                'Casual wear like a hoodie and joggers.',
                'A relaxed fit shirt with shorts.',
                'Comfortable jeans with a graphic tee.'
            ],
            movie_night: [
                'Comfortable pajamas or loungewear.',
                'A cozy sweater with sweatpants.',
                'A relaxed fit t-shirt with joggers.'
            ],
            back_to_school: [
                'Casual jeans and a graphic tee.',
                'A stylish hoodie with joggers.',
                'A fitted shirt with shorts.'
            ],
            graduation: [
                'A smart dress or a classy outfit.',
                'A tailored dress with a graduation gown.',
                'A casual blazer with a fitted shirt and chinos.'
            ],
            first_date: [
                'A nice dress or a stylish top with jeans.',
                'A fitted blouse with a skirt and heels.',
                'A casual blazer over a t-shirt with tailored pants.'
            ],
            photoshoot: [
                'Trendy outfit that reflects your style.',
                'A stylish dress with bold accessories.',
                'A fitted top with a flowy skirt and statement jewelry.'
            ],
            family_gatherings: [
                'Smart casual attire.',
                'A comfortable sweater with jeans.',
                'A tailored shirt with a skirt.'
            ],
            baby_shower: [
                'A lovely dress or a stylish top with a skirt.',
                
                'A comfortable maxi dress with sandals.',
                
                'A fitted blouse with tailored pants.'
            ]
        }
    };

    // Get the recommendation based on gender and occasion
    const recommendations = outfits[gender][occasion];
    recommendation = recommendations ? recommendations.join('\n') : 'No recommendation available for this selection.';

    resultDiv.innerText = recommendation;
});
