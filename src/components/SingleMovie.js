import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const SingleMovie = () => {
  const [data, setDate] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [disneyAvailabilty, setDisneyAvailability] = useState("");
  const [hotstarAvailabilty, setHotstarAvailability] = useState("");
  const [primeAvailabilty, setPrimeAvailability] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  function countrySelection() {
    const selectBox = document.getElementById("countries");
    setSelectedCountry(selectBox.options[selectBox.selectedIndex].value);
  }

  const paraClass =
    "text-md font-medium text-gray-700 leading-tight text-justify mb-2";

  const fetchavailabliity = async () => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "731a1fd9e1msh78768f93ed2f6adp186cf5jsndcbf5a2c4252",
        "X-RapidAPI-Host": "streaming-availability.p.rapidapi.com",
      },
    };
    const response = await fetch(
      `https://streaming-availability.p.rapidapi.com/get/ultra?country=ca&output_language=en&tmdb_id=movie/${id}`,
      options
    );
    const datas = await response.json();
    if (datas.streamingInfo) {
      if (datas.streamingInfo.disney) {
        setDisneyAvailability(datas.streamingInfo.disney);
      }
      if (datas.streamingInfo.hotstar) {
        setHotstarAvailability(datas.streamingInfo.hotstar);
      }
      if (datas.streamingInfo.prime) {
        setPrimeAvailability(datas.streamingInfo.prime);
      }
    }

    console.log("Availability =>", datas);
  };

  useEffect(() => {
    console.log("DISNEY => ", disneyAvailabilty);
    console.log("HOTSTAR => ", hotstarAvailabilty);
    console.log("PRIME => ", primeAvailabilty);
  }, [disneyAvailabilty, hotstarAvailabilty, primeAvailabilty]);

  const getDate = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=5b7315fd732e53a22c34ad6cb3b4a6b0&language=en-US`
    );
    const datas = await response.json();
    setLoading(false);
    setDate(datas);
  };
  useEffect(() => {
    getDate();
    fetchavailabliity();
  }, []);
  useEffect(() => {
    console.log(data);
  }, [data]);
  if (loading) {
    return (
      <div className="bg-[rgb(36,36,36)] text-white h-screen snap-y snap-mandatory overflow-y-scroll overflow-x-hidden scrollbar scrollbar-track-gray-400/20 scroll-smooth scrollbar-thumb-[#F7AB0A]/80 z-0">
        <div className="flex justify-center h-full items-center">
          <div className="relative w-24 h-24 animate-spin rounded-full bg-gradient-to-r from-purple-400 via-blue-500 to-red-400 ">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-[rgb(36,36,36)] rounded-full border-2 border-[rgb(36,36,36)]"></div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="ml-5 mr-5">
        <div
          class="mt-5 bg-white shadow-lg border-gray-100 max-h-80	 border sm:rounded-3xl p-2 flex hover:drop-shadow-2xl cursor-pointer"
          key={data?.id}
        >
          <div class="h-48 overflow-visible w-1/2">
            <img
              class="rounded-3xl shadow-lg bg-contain h-48"
              src={`https://image.tmdb.org/t/p/original/${data?.poster_path}`}
              alt=""
            />
          </div>
          <div class="flex flex-col w-1/2 space-y-4  justify-start items-center">
            <div class="flex justify-between items-start">
              <h2 class="text-md font-bold text-black">{data?.title}</h2>
              <div class="bg-yellow-400 font-bold rounded-xl ml-2 p-2">
                {data?.vote_average}
              </div>
            </div>
            <div>
              <div class="text-sm text-gray-400">Release Date</div>
              <div class="text-lg text-gray-800">{data?.release_date}</div>
            </div>
            <p class=" text-gray-900 max-h-40 overflow-y-hidden">
              {data?.overview}{" "}
              {/* <span className=" text-blue-700 cursor-pointer">
                    Read More ...
                  </span> */}
            </p>
            {/* <div class="flex text-2xl font-bold text-a">$83.90</div> */}
          </div>
        </div>
        <div className="mt-5 mb-5 bg-white shadow-lg border-gray-100 max-h-80	 border sm:rounded-3xl p-2 flex hover:drop-shadow-2xl cursor-pointer ">
          <div className="w-full flex flex-col items-center justify-evenly">
            <label
              for="countries"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              <p className={`${paraClass}`}>Availability</p>
            </label>
            <select
              id="countries"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block -2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={countrySelection}
            >
              <option selected>Choose a country</option>
              <option value="AF">Afghanistan</option>
              <option value="AL">Albania</option>
              <option value="DZ">Algeria</option>
              <option value="AO">Angola</option>
              <option value="AR">Argentina</option>
              <option value="AM">Armenia</option>
              <option value="AU">Australia</option>
              <option value="AT">Austria</option>
              <option value="AZ">Azerbaijan</option>
              <option value="BH">Bahrain</option>
              <option value="BD">Bangladesh</option>
              <option value="BY">Belarus</option>
              <option value="BE">Belgium</option>
              <option value="BZ">Belize</option>
              <option value="BJ">Benin</option>
              <option value="BT">Bhutan</option>
              <option value="BO">Bolivia</option>
              <option value="BA">Bosnia and Herzegovina</option>
              <option value="BW">Botswana</option>
              <option value="BR">Brazil</option>
              <option value="BN">Brunei</option>
              <option value="BG">Bulgaria</option>
              <option value="BF">Burkina Faso</option>
              <option value="BI">Burundi</option>
              <option value="KH">Cambodia</option>
              <option value="CM">Cameroon</option>
              <option value="CA">Canada</option>
              <option value="CV">Cape Verde</option>
              <option value="CF">Central African Republic</option>
              <option value="TD">Chad</option>
              <option value="CL">Chile</option>
              <option value="CN">China</option>
              <option value="CO">Colombia</option>
              <option value="KM">Comoros</option>
              <option value="CG">Congo</option>
              <option value="CD">Democratic Republic of the Congo</option>
              <option value="CR">Costa Rica</option>
              <option value="CI">Côte d'Ivoire</option>
              <option value="HR">Croatia</option>
              <option value="CU">Cuba</option>
              <option value="CY">Cyprus</option>
              <option value="CZ">Czech Republic</option>
              <option value="DK">Denmark</option>
              <option value="DJ">Djibouti</option>
              <option value="DM">Dominica</option>
              <option value="DO">Dominican Republic</option>
              <option value="EC">Ecuador</option>
              <option value="EG">Egypt</option>
              <option value="SV">El Salvador</option>
              <option value="GQ">Equatorial Guinea</option>
              <option value="ER">Eritrea</option>
              <option value="ET">Ethiopia</option>
              <option value="FJ">Fiji</option>
              <option value="FI">Finland</option>
              <option value="FR">France</option>
              <option value="GA">Gabon</option>
              <option value="GM">Gambia</option>
              <option value="GE">Georgia</option>
              <option value="DE">Germany</option>
              <option value="GH">Ghana</option>
              <option value="GR">Greece</option>
              <option value="GD">Grenada</option>
              <option value="GT">Guatemala</option>
              <option value="GN">Guinea</option>
              <option value="GW">Guinea-Bissau</option>
              <option value="GY">Guyana</option>
              <option value="HT">Haiti</option>
              <option value="HN">Honduras</option>
              <option value="HU">Hungary</option>
              <option value="IS">Iceland</option>
              <option value="IN">India</option>
              <option value="ID">Indonesia</option>
              <option value="IR">Iran</option>
              <option value="IQ">Iraq</option>
              <option value="IE">Ireland</option>
              <option value="IL">Israel</option>
              <option value="IT">Italy</option>
              <option value="JM">Jamaica</option>
              <option value="JP">Japan</option>
              <option value="JO">Jordan</option>
              <option value="KZ">Kazakhstan</option>
              <option value="KE">Kenya</option>
              <option value="KI">Kiribati</option>
              <option value="KW">Kuwait</option>
              <option value="KG">Kyrgyzstan</option>
              <option value="LA">Laos</option>
              <option value="LV">Latvia</option>
              <option value="LB">Lebanon</option>
              <option value="LS">Lesotho</option>
              <option value="LR">Liberia</option>
              <option value="LY">Libya</option>
              <option value="LI">Liechtenstein</option>
              <option value="LT">Lithuania</option>
              <option value="LU">Luxembourg</option>
              <option value="MK">North Macedonia</option>
              <option value="MG">Madagascar</option>
              <option value="MW">Malawi</option>
              <option value="MY">Malaysia</option>
              <option value="MV">Maldives</option>
              <option value="ML">Mali</option>
              <option value="MT">Malta</option>
              <option value="MH">Marshall Islands</option>
              <option value="MR">Mauritania</option>
              <option value="MU">Mauritius</option>
              <option value="MX">Mexico</option>
              <option value="FM">Micronesia</option>
              <option value="MD">Moldova</option>
              <option value="MC">Monaco</option>
              <option value="MN">Mongolia</option>
              <option value="ME">Montenegro</option>
              <option value="MA">Morocco</option>
              <option value="MZ">Mozambique</option>
              <option value="MM">Myanmar (Burma)</option>
              <option value="NA">Namibia</option>
              <option value="NR">Nauru</option>
              <option value="NP">Nepal</option>
              <option value="NL">Netherlands</option>
              <option value="NC">New Caledonia</option>
              <option value="NZ">New Zealand</option>
              <option value="NI">Nicaragua</option>
              <option value="NE">Niger</option>
              <option value="NG">Nigeria</option>
              <option value="NU">Niue</option>
              <option value="NF">Norfolk Island</option>
              <option value="KP">North Korea</option>
              <option value="MP">Northern Mariana Islands</option>
              <option value="NO">Norway</option>
              <option value="OM">Oman</option>
              <option value="PK">Pakistan</option>
              <option value="PW">Palau</option>
              <option value="PS">Palestine</option>
              <option value="PA">Panama</option>
              <option value="PG">Papua New Guinea</option>
              <option value="PY">Paraguay</option>
              <option value="PE">Peru</option>
              <option value="PH">Philippines</option>
              <option value="PN">Pitcairn Islands</option>
              <option value="PL">Poland</option>
              <option value="PT">Portugal</option>
              <option value="PR">Puerto Rico</option>
              <option value="QA">Qatar</option>
              <option value="CG">Republic of the Congo</option>
              <option value="RO">Romania</option>
              <option value="RU">Russia</option>
              <option value="RW">Rwanda</option>
              <option value="RE">Réunion</option>
              <option value="BL">Saint Barthélemy</option>
              <option value="SH">Saint Helena</option>
              <option value="KN">Saint Kitts and Nevis</option>
              <option value="LC">Saint Lucia</option>
              <option value="MF">Saint Martin</option>
              <option value="PM">Saint Pierre and Miquelon</option>
              <option value="VC">Saint Vincent and the Grenadines</option>
              <option value="WS">Samoa</option>
              <option value="SM">San Marino</option>
              <option value="ST">São Tomé and Príncipe</option>
              <option value="SN">Senegal</option>
              <option value="RS">Serbia</option>
              <option value="SC">Seychelles</option>
              <option value="SL">Sierra Leone</option>
              <option value="SG">Singapore</option>
              <option value="SX">Sint Maarten (Dutch part)</option>
              <option value="SK">Slovakia</option>
              <option value="SI">Slovenia</option>
              <option value="SB">Solomon Islands</option>
              <option value="SO">Somalia</option>
              <option value="ZA">South Africa</option>
              <option value="GS">
                South Georgia and the South Sandwich Islands
              </option>
              <option value="KR">South Korea</option>
              <option value="SS">South Sudan</option>
              <option value="ES">Spain</option>
              <option value="LK">Sri Lanka</option>
              <option value="SD">Sudan</option>
              <option value="SR">Suriname</option>
              <option value="SJ">Svalbard and Jan Mayen</option>
              <option value="SZ">Swaziland</option>
              <option value="SE">Sweden</option>
              <option value="CH">Switzerland</option>
              <option value="SY">Syria</option>
              <option value="TW">Taiwan</option>
              <option value="TJ">Tajikistan</option>
              <option value="TZ">Tanzania</option>
              <option value="TH">Thailand</option>
              <option value="TG">Togo</option>
              <option value="TK">Tokelau</option>
              <option value="TO">Tonga</option>
              <option value="TT">Trinidad and Tobago</option>
              <option value="TN">Tunisia</option>
              <option value="TR">Turkey</option>
              <option value="TM">Turkmenistan</option>
              <option value="TC">Turks and Caicos Islands</option>
              <option value="TV">Tuvalu</option>
              <option value="UM">U.S. Minor Outlying Islands</option>
              <option value="VI">U.S. Virgin Islands</option>
              <option value="UG">Uganda</option>
              <option value="UA">Ukraine</option>
              <option value="AE">United Arab Emirates</option>
              <option value="GB">United Kingdom</option>
              <option value="US">United States</option>
              <option value="UY">Uruguay</option>
              <option value="UZ">Uzbekistan</option>
              <option value="VU">Vanuatu</option>
              <option value="VA">Vatican City</option>
              <option value="VE">Venezuela</option>
              <option value="VN">Vietnam</option>
              <option value="WF">Wallis and Futuna</option>
              <option value="EH">Western Sahara</option>
              <option value="YE">Yemen</option>
              <option value="ZM">Zambia</option>
              <option value="ZW">Zimbabwe</option>
            </select>
            {/* <div>
              <p className={`${paraClass}`}>DISNEY</p>
              
            </div>
            <div>
              <p className={`${paraClass}`}>HOTSTAR</p>
              <div>Azerbaijan</div>
            </div>
            <div>
              <p className={`${paraClass}`}>PRIME</p>
              <div>Azerbaijan</div>
            </div> */}
          </div>
        </div>
      </div>
    );
  }
};

export default SingleMovie;
