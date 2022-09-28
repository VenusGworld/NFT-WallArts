import React from "react";
import { RadioGroup, RoundedDropDownSelect , RoundedPhoneNumberInput, RoundedTextInput } from "../../components/Input";
import PaymentMethodCard from "./PaymentMethodCard";
import PreviewPart from "./PreviewPart";

const countries = [ 
  {text: 'Afghanistan', value: 'AF'}, 
  {text: 'Åland Islands', value: 'AX'}, 
  {text: 'Albania', value: 'AL'}, 
  {text: 'Algeria', value: 'DZ'}, 
  {text: 'American Samoa', value: 'AS'}, 
  {text: 'AndorrA', value: 'AD'}, 
  {text: 'Angola', value: 'AO'}, 
  {text: 'Anguilla', value: 'AI'}, 
  {text: 'Antarctica', value: 'AQ'}, 
  {text: 'Antigua and Barbuda', value: 'AG'}, 
  {text: 'Argentina', value: 'AR'}, 
  {text: 'Armenia', value: 'AM'}, 
  {text: 'Aruba', value: 'AW'}, 
  {text: 'Australia', value: 'AU'}, 
  {text: 'Austria', value: 'AT'}, 
  {text: 'Azerbaijan', value: 'AZ'}, 
  {text: 'Bahamas', value: 'BS'}, 
  {text: 'Bahrain', value: 'BH'}, 
  {text: 'Bangladesh', value: 'BD'}, 
  {text: 'Barbados', value: 'BB'}, 
  {text: 'Belarus', value: 'BY'}, 
  {text: 'Belgium', value: 'BE'}, 
  {text: 'Belize', value: 'BZ'}, 
  {text: 'Benin', value: 'BJ'}, 
  {text: 'Bermuda', value: 'BM'}, 
  {text: 'Bhutan', value: 'BT'}, 
  {text: 'Bolivia', value: 'BO'}, 
  {text: 'Bosnia and Herzegovina', value: 'BA'}, 
  {text: 'Botswana', value: 'BW'}, 
  {text: 'Bouvet Island', value: 'BV'}, 
  {text: 'Brazil', value: 'BR'}, 
  {text: 'British Indian Ocean Territory', value: 'IO'}, 
  {text: 'Brunei Darussalam', value: 'BN'}, 
  {text: 'Bulgaria', value: 'BG'}, 
  {text: 'Burkina Faso', value: 'BF'}, 
  {text: 'Burundi', value: 'BI'}, 
  {text: 'Cambodia', value: 'KH'}, 
  {text: 'Cameroon', value: 'CM'}, 
  {text: 'Canada', value: 'CA'}, 
  {text: 'Cape Verde', value: 'CV'}, 
  {text: 'Cayman Islands', value: 'KY'}, 
  {text: 'Central African Republic', value: 'CF'}, 
  {text: 'Chad', value: 'TD'}, 
  {text: 'Chile', value: 'CL'}, 
  {text: 'China', value: 'CN'}, 
  {text: 'Christmas Island', value: 'CX'}, 
  {text: 'Cocos (Keeling) Islands', value: 'CC'}, 
  {text: 'Colombia', value: 'CO'}, 
  {text: 'Comoros', value: 'KM'}, 
  {text: 'Congo', value: 'CG'}, 
  {text: 'Congo, The Democratic Republic of the', value: 'CD'}, 
  {text: 'Cook Islands', value: 'CK'}, 
  {text: 'Costa Rica', value: 'CR'}, 
  {text: 'Cote D\'Ivoire', value: 'CI'}, 
  {text: 'Croatia', value: 'HR'}, 
  {text: 'Cuba', value: 'CU'}, 
  {text: 'Cyprus', value: 'CY'}, 
  {text: 'Czech Republic', value: 'CZ'}, 
  {text: 'Denmark', value: 'DK'}, 
  {text: 'Djibouti', value: 'DJ'}, 
  {text: 'Dominica', value: 'DM'}, 
  {text: 'Dominican Republic', value: 'DO'}, 
  {text: 'Ecuador', value: 'EC'}, 
  {text: 'Egypt', value: 'EG'}, 
  {text: 'El Salvador', value: 'SV'}, 
  {text: 'Equatorial Guinea', value: 'GQ'}, 
  {text: 'Eritrea', value: 'ER'}, 
  {text: 'Estonia', value: 'EE'}, 
  {text: 'Ethiopia', value: 'ET'}, 
  {text: 'Falkland Islands (Malvinas)', value: 'FK'}, 
  {text: 'Faroe Islands', value: 'FO'}, 
  {text: 'Fiji', value: 'FJ'}, 
  {text: 'Finland', value: 'FI'}, 
  {text: 'France', value: 'FR'}, 
  {text: 'French Guiana', value: 'GF'}, 
  {text: 'French Polynesia', value: 'PF'}, 
  {text: 'French Southern Territories', value: 'TF'}, 
  {text: 'Gabon', value: 'GA'}, 
  {text: 'Gambia', value: 'GM'}, 
  {text: 'Georgia', value: 'GE'}, 
  {text: 'Germany', value: 'DE'}, 
  {text: 'Ghana', value: 'GH'}, 
  {text: 'Gibraltar', value: 'GI'}, 
  {text: 'Greece', value: 'GR'}, 
  {text: 'Greenland', value: 'GL'}, 
  {text: 'Grenada', value: 'GD'}, 
  {text: 'Guadeloupe', value: 'GP'}, 
  {text: 'Guam', value: 'GU'}, 
  {text: 'Guatemala', value: 'GT'}, 
  {text: 'Guernsey', value: 'GG'}, 
  {text: 'Guinea', value: 'GN'}, 
  {text: 'Guinea-Bissau', value: 'GW'}, 
  {text: 'Guyana', value: 'GY'}, 
  {text: 'Haiti', value: 'HT'}, 
  {text: 'Heard Island and Mcdonald Islands', value: 'HM'}, 
  {text: 'Holy See (Vatican City State)', value: 'VA'}, 
  {text: 'Honduras', value: 'HN'}, 
  {text: 'Hong Kong', value: 'HK'}, 
  {text: 'Hungary', value: 'HU'}, 
  {text: 'Iceland', value: 'IS'}, 
  {text: 'India', value: 'IN'}, 
  {text: 'Indonesia', value: 'ID'}, 
  {text: 'Iran, Islamic Republic Of', value: 'IR'}, 
  {text: 'Iraq', value: 'IQ'}, 
  {text: 'Ireland', value: 'IE'}, 
  {text: 'Isle of Man', value: 'IM'}, 
  {text: 'Israel', value: 'IL'}, 
  {text: 'Italy', value: 'IT'}, 
  {text: 'Jamaica', value: 'JM'}, 
  {text: 'Japan', value: 'JP'}, 
  {text: 'Jersey', value: 'JE'}, 
  {text: 'Jordan', value: 'JO'}, 
  {text: 'Kazakhstan', value: 'KZ'}, 
  {text: 'Kenya', value: 'KE'}, 
  {text: 'Kiribati', value: 'KI'}, 
  {text: 'Korea, Democratic People\'S Republic of', value: 'KP'}, 
  {text: 'Korea, Republic of', value: 'KR'}, 
  {text: 'Kuwait', value: 'KW'}, 
  {text: 'Kyrgyzstan', value: 'KG'}, 
  {text: 'Lao People\'S Democratic Republic', value: 'LA'}, 
  {text: 'Latvia', value: 'LV'}, 
  {text: 'Lebanon', value: 'LB'}, 
  {text: 'Lesotho', value: 'LS'}, 
  {text: 'Liberia', value: 'LR'}, 
  {text: 'Libyan Arab Jamahiriya', value: 'LY'}, 
  {text: 'Liechtenstein', value: 'LI'}, 
  {text: 'Lithuania', value: 'LT'}, 
  {text: 'Luxembourg', value: 'LU'}, 
  {text: 'Macao', value: 'MO'}, 
  {text: 'Macedonia, The Former Yugoslav Republic of', value: 'MK'}, 
  {text: 'Madagascar', value: 'MG'}, 
  {text: 'Malawi', value: 'MW'}, 
  {text: 'Malaysia', value: 'MY'}, 
  {text: 'Maldives', value: 'MV'}, 
  {text: 'Mali', value: 'ML'}, 
  {text: 'Malta', value: 'MT'}, 
  {text: 'Marshall Islands', value: 'MH'}, 
  {text: 'Martinique', value: 'MQ'}, 
  {text: 'Mauritania', value: 'MR'}, 
  {text: 'Mauritius', value: 'MU'}, 
  {text: 'Mayotte', value: 'YT'}, 
  {text: 'Mexico', value: 'MX'}, 
  {text: 'Micronesia, Federated States of', value: 'FM'}, 
  {text: 'Moldova, Republic of', value: 'MD'}, 
  {text: 'Monaco', value: 'MC'}, 
  {text: 'Mongolia', value: 'MN'}, 
  {text: 'Montserrat', value: 'MS'}, 
  {text: 'Morocco', value: 'MA'}, 
  {text: 'Mozambique', value: 'MZ'}, 
  {text: 'Myanmar', value: 'MM'}, 
  {text: 'Namibia', value: 'NA'}, 
  {text: 'Nauru', value: 'NR'}, 
  {text: 'Nepal', value: 'NP'}, 
  {text: 'Netherlands', value: 'NL'}, 
  {text: 'Netherlands Antilles', value: 'AN'}, 
  {text: 'New Caledonia', value: 'NC'}, 
  {text: 'New Zealand', value: 'NZ'}, 
  {text: 'Nicaragua', value: 'NI'}, 
  {text: 'Niger', value: 'NE'}, 
  {text: 'Nigeria', value: 'NG'}, 
  {text: 'Niue', value: 'NU'}, 
  {text: 'Norfolk Island', value: 'NF'}, 
  {text: 'Northern Mariana Islands', value: 'MP'}, 
  {text: 'Norway', value: 'NO'}, 
  {text: 'Oman', value: 'OM'}, 
  {text: 'Pakistan', value: 'PK'}, 
  {text: 'Palau', value: 'PW'}, 
  {text: 'Palestinian Territory, Occupied', value: 'PS'}, 
  {text: 'Panama', value: 'PA'}, 
  {text: 'Papua New Guinea', value: 'PG'}, 
  {text: 'Paraguay', value: 'PY'}, 
  {text: 'Peru', value: 'PE'}, 
  {text: 'Philippines', value: 'PH'}, 
  {text: 'Pitcairn', value: 'PN'}, 
  {text: 'Poland', value: 'PL'}, 
  {text: 'Portugal', value: 'PT'}, 
  {text: 'Puerto Rico', value: 'PR'}, 
  {text: 'Qatar', value: 'QA'}, 
  {text: 'Reunion', value: 'RE'}, 
  {text: 'Romania', value: 'RO'}, 
  {text: 'Russian Federation', value: 'RU'}, 
  {text: 'RWANDA', value: 'RW'}, 
  {text: 'Saint Helena', value: 'SH'}, 
  {text: 'Saint Kitts and Nevis', value: 'KN'}, 
  {text: 'Saint Lucia', value: 'LC'}, 
  {text: 'Saint Pierre and Miquelon', value: 'PM'}, 
  {text: 'Saint Vincent and the Grenadines', value: 'VC'}, 
  {text: 'Samoa', value: 'WS'}, 
  {text: 'San Marino', value: 'SM'}, 
  {text: 'Sao Tome and Principe', value: 'ST'}, 
  {text: 'Saudi Arabia', value: 'SA'}, 
  {text: 'Senegal', value: 'SN'}, 
  {text: 'Serbia and Montenegro', value: 'CS'}, 
  {text: 'Seychelles', value: 'SC'}, 
  {text: 'Sierra Leone', value: 'SL'}, 
  {text: 'Singapore', value: 'SG'}, 
  {text: 'Slovakia', value: 'SK'}, 
  {text: 'Slovenia', value: 'SI'}, 
  {text: 'Solomon Islands', value: 'SB'}, 
  {text: 'Somalia', value: 'SO'}, 
  {text: 'South Africa', value: 'ZA'}, 
  {text: 'South Georgia and the South Sandwich Islands', value: 'GS'}, 
  {text: 'Spain', value: 'ES'}, 
  {text: 'Sri Lanka', value: 'LK'}, 
  {text: 'Sudan', value: 'SD'}, 
  {text: 'Suriname', value: 'SR'}, 
  {text: 'Svalbard and Jan Mayen', value: 'SJ'}, 
  {text: 'Swaziland', value: 'SZ'}, 
  {text: 'Sweden', value: 'SE'}, 
  {text: 'Switzerland', value: 'CH'}, 
  {text: 'Syrian Arab Republic', value: 'SY'}, 
  {text: 'Taiwan, Province of China', value: 'TW'}, 
  {text: 'Tajikistan', value: 'TJ'}, 
  {text: 'Tanzania, United Republic of', value: 'TZ'}, 
  {text: 'Thailand', value: 'TH'}, 
  {text: 'Timor-Leste', value: 'TL'}, 
  {text: 'Togo', value: 'TG'}, 
  {text: 'Tokelau', value: 'TK'}, 
  {text: 'Tonga', value: 'TO'}, 
  {text: 'Trinidad and Tobago', value: 'TT'}, 
  {text: 'Tunisia', value: 'TN'}, 
  {text: 'Turkey', value: 'TR'}, 
  {text: 'Turkmenistan', value: 'TM'}, 
  {text: 'Turks and Caicos Islands', value: 'TC'}, 
  {text: 'Tuvalu', value: 'TV'}, 
  {text: 'Uganda', value: 'UG'}, 
  {text: 'Ukraine', value: 'UA'}, 
  {text: 'United Arab Emirates', value: 'AE'}, 
  {text: 'United Kingdom', value: 'GB'}, 
  {text: 'United States', value: 'US'}, 
  {text: 'United States Minor Outlying Islands', value: 'UM'}, 
  {text: 'Uruguay', value: 'UY'}, 
  {text: 'Uzbekistan', value: 'UZ'}, 
  {text: 'Vanuatu', value: 'VU'}, 
  {text: 'Venezuela', value: 'VE'}, 
  {text: 'Viet Nam', value: 'VN'}, 
  {text: 'Virgin Islands, British', value: 'VG'}, 
  {text: 'Virgin Islands, U.S.', value: 'VI'}, 
  {text: 'Wallis and Futuna', value: 'WF'}, 
  {text: 'Western Sahara', value: 'EH'}, 
  {text: 'Yemen', value: 'YE'}, 
  {text: 'Zambia', value: 'ZM'}, 
  {text: 'Zimbabwe', value: 'ZW'} 
]

const states = [
  {
      text: "Alabama",
      value: "AL"
  },
  {
      text: "Alaska",
      value: "AK"
  },
  {
      text: "American Samoa",
      value: "AS"
  },
  {
      text: "Arizona",
      value: "AZ"
  },
  {
      text: "Arkansas",
      value: "AR"
  },
  {
      text: "California",
      value: "CA"
  },
  {
      text: "Colorado",
      value: "CO"
  },
  {
      text: "Connecticut",
      value: "CT"
  },
  {
      text: "Delaware",
      value: "DE"
  },
  {
      text: "District Of Columbia",
      value: "DC"
  },
  {
      text: "Federated States Of Micronesia",
      value: "FM"
  },
  {
      text: "Florida",
      value: "FL"
  },
  {
      text: "Georgia",
      value: "GA"
  },
  {
      text: "Guam Gu",
      value: "GU"
  },
  {
      text: "Hawaii",
      value: "HI"
  },
  {
      text: "Idaho",
      value: "ID"
  },
  {
      text: "Illinois",
      value: "IL"
  },
  {
      text: "Indiana",
      value: "IN"
  },
  {
      text: "Iowa",
      value: "IA"
  },
  {
      text: "Kansas",
      value: "KS"
  },
  {
      text: "Kentucky",
      value: "KY"
  },
  {
      text: "Louisiana",
      value: "LA"
  },
  {
      text: "Maine",
      value: "ME"
  },
  {
      text: "Marshall Islands",
      value: "MH"
  },
  {
      text: "Maryland",
      value: "MD"
  },
  {
      text: "Massachusetts",
      value: "MA"
  },
  {
      text: "Michigan",
      value: "MI"
  },
  {
      text: "Minnesota",
      value: "MN"
  },
  {
      text: "Mississippi",
      value: "MS"
  },
  {
      text: "Missouri",
      value: "MO"
  },
  {
      text: "Montana",
      value: "MT"
  },
  {
      text: "Nebraska",
      value: "NE"
  },
  {
      text: "Nevada",
      value: "NV"
  },
  {
      text: "New Hampshire",
      value: "NH"
  },
  {
      text: "New Jersey",
      value: "NJ"
  },
  {
      text: "New Mexico",
      value: "NM"
  },
  {
      text: "New York",
      value: "NY"
  },
  {
      text: "North Carolina",
      value: "NC"
  },
  {
      text: "North Dakota",
      value: "ND"
  },
  {
      text: "Northern Mariana Islands",
      value: "MP"
  },
  {
      text: "Ohio",
      value: "OH"
  },
  {
      text: "Oklahoma",
      value: "OK"
  },
  {
      text: "Oregon",
      value: "OR"
  },
  {
      text: "Palau",
      value: "PW"
  },
  {
      text: "Pennsylvania",
      value: "PA"
  },
  {
      text: "Puerto Rico",
      value: "PR"
  },
  {
      text: "Rhode Island",
      value: "RI"
  },
  {
      text: "South Carolina",
      value: "SC"
  },
  {
      text: "South Dakota",
      value: "SD"
  },
  {
      text: "Tennessee",
      value: "TN"
  },
  {
      text: "Texas",
      value: "TX"
  },
  {
      text: "Utah",
      value: "UT"
  },
  {
      text: "Vermont",
      value: "VT"
  },
  {
      text: "Virgin Islands",
      value: "VI"
  },
  {
      text: "Virginia",
      value: "VA"
  },
  {
      text: "Washington",
      value: "WA"
  },
  {
      text: "West Virginia",
      value: "WV"
  },
  {
      text: "Wisconsin",
      value: "WI"
  },
  {
      text: "Wyoming",
      value: "WY"
  }
]

const Payment = () => {
  return (
    <div className="w-full h-full mt-20 relative text-white">
      <div className="bg-[#363f54] w-full p-10 relative flex flex-col justify-start items-start">
        <div className="w-[80%] mx-auto flex">
          <div className="flex justify-start items-start w-3/5 pr-8">
            <div className="flex flex-col">
              <span className="xl:text-5xl lg:text-3xl md:text-2xl text-lg font-bold inline-block my-7 text-start">
                Mailing Details
              </span>
              <div className="flex flex-col items-start">
                <span className=" text-[#D3B789] my-8">1.Contact Information</span>
                <div className="flex flex-wrap justify-between">
                  <div className=" w-[45%] mb-5">
                    <RoundedTextInput label='First Name' defaultValue='John'/>
                  </div>
                  <div className=" w-[45%] mb-5">
                    <RoundedTextInput label='Last Name' defaultValue='Doe'/>
                  </div>
                  <div className=" w-[45%] mb-5">
                    <RoundedPhoneNumberInput label='Phone No.' defaultValue='5505623'/> 
                  </div>
                  <div className=" w-[45%] mb-5">
                    <RoundedTextInput label='Email' defaultValue='johndoe@zmail.com'/>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start">
                <span className=" text-[#D3B789] my-8">2. Delivery Address</span>
                <div className="flex flex-wrap justify-between">
                  <div className=" w-[45%] mb-5">
                    <RoundedTextInput label='Address' defaultValue='Oliver Street'/>
                  </div>
                  <div className=" w-[45%] mb-5">
                    <RoundedTextInput label='Apt / Suite No.' defaultValue='235 B'/>
                  </div>
                  <div className=" w-[45%] mb-5">
                    <RoundedTextInput label='City' defaultValue='Grapevine'/>
                  </div>
                  <div className=" w-[45%] mb-5">
                    <RoundedDropDownSelect label='Country' list={countries} onChangeHandle={() => {}}/>
                  </div>
                  <div className=" w-[45%] mb-5">
                    <RoundedDropDownSelect label='State' list={states} onChangeHandle={() => {}}/>
                  </div>
                  <div className=" w-[45%] mb-5">
                    <RoundedTextInput label='Postal Code' defaultValue='94403'/>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start">
                <span className=" text-[#D3B789] my-8">3. Payment Method</span>
                <div className=" relative w-full">
                  <PaymentMethodCard/>
                </div>
                <div className="flex flex-wrap my-10">
                  <RadioGroup list={['Same as shipping address','Use a different billing address']}/>
                </div>
                <div className="flex flex-wrap justify-between">
                  <div className=" w-[45%] mb-5">
                    <RoundedTextInput label='First Name' defaultValue='John'/>
                  </div>
                  <div className=" w-[45%] mb-5">
                    <RoundedTextInput label='Last Name' defaultValue='Doe'/>
                  </div>
                  <div className=" w-[45%] mb-5">
                    <RoundedTextInput label='Address' defaultValue='Oliver Street'/>
                  </div>
                  <div className=" w-[45%] mb-5">
                    <RoundedTextInput label='Apt / Suite No.' defaultValue='235 B'/>
                  </div>
                  <div className=" w-[45%] mb-5">
                    <RoundedTextInput label='City' defaultValue='Grapevine'/>
                  </div>
                  <div className=" w-[45%] mb-5">
                    <RoundedDropDownSelect label='Country' list={countries} onChangeHandle={() => {}}/>
                  </div>
                  <div className=" w-[45%] mb-5">
                    <RoundedDropDownSelect label='State' list={states} onChangeHandle={() => {}}/>
                  </div>
                  <div className=" w-[45%] mb-5">
                    <RoundedTextInput label='Postal Code' defaultValue='94403'/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[5/12] mx-auto">
            <PreviewPart/>    
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
