import React, { useState, useRef, useEffect } from "react";
import { Text } from "../Components/Text";
import { FiSave } from "react-icons/fi";
import SimpleSelect from "../Components/SimpleSelect";
import { PiUserSquare } from "react-icons/pi";
import { Country, City } from 'country-state-city';
import { BsCheck2Circle } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import CustomCalendar from "../Components/CustomCalendar";
import PageHeader from "../Components/PageHeader";
import SearchInput from "../Components/SeachInput";
import axios from "axios";
import { format } from "date-fns";

const NewEmployee = () => {
  const navigate = useNavigate();
  const [imgFile, setImgFile] = useState(null);
  const dataCountries = Country.getAllCountries();
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedJobTitle, setSelectedJobTitle] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [taxIdentfier, settaxIdentfier] = useState('');
  const countryVal = selectedCountry ? selectedCountry["name"] : "";
  const [isSaved, setIsSaved] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const formButtonRef = useRef();
  const location = useLocation();
  const { employee } = location.state;
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    workEmail: '',
    personalEmail: '', // Vous devez déterminer comment obtenir cette valeur
    address: '',
    country: '',
    cityState: '',
    personalTaxIdentifierNumber: '',
    phoneNumber: '',
    jobTitle: '',
    level: '',
    department: '',
    startDate: '',
    photo: '',
    // Autres champs du formulaire avec des valeurs vides
  });


  useEffect(() => {
    if (location.state && location.state.employee) {
      console.log(employee)
      setFormData({
        firstName: employee.firstName,
        lastName: employee.lastName,
        workEmail: employee.email,
        personalEmail: employee.email, 
        address: employee.address,
        country: employee.country,
        cityState: employee.cityState,
        personalTaxIdentifierNumber: employee.personalTaxIdentifierNumber,
        phoneNumber: employee.phoneNumber,
        jobTitle: employee.jobTitle,
        level: employee.level,
        department: employee.department,
        startDate: employee.startDate,
        photo: employee.photo,
      });
    }
    if (isSaved) {
      // Rediriger vers "/Employees" après 2 secondes
      const redirectTimer = setTimeout(() => {
        navigate("/Employees");
      }, 1000);

      // Nettoyer le timer lorsque le composant se démonte
      return () => clearTimeout(redirectTimer);
    }
  }, [isSaved, navigate, location.state]);


  const handleChange = (e, fieldName) => {
    const formattedValue = e.target.value
      // Supprime tous les caractères non numériques
      .replace(/\D/g, '')
      // Insère un tiret entre chaque groupe de quatre chiffres
      .replace(/(\d{4})/g, '$1 - ')
      // Supprime le dernier espace et tiret s'il y en a un
      .replace(/ - $/, '');
  
    setFormData(prevState => ({
      ...prevState,
      [fieldName]: formattedValue
    }));
  };
  

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setImgFile(file);
  };


  const onSubmit = async (data) => {
    try {
      const token = sessionStorage.getItem("userToken");
      const userData = JSON.parse(sessionStorage.getItem("userData"));
      const userId = userData._id;

      // Convertir l'image en base64
      const reader = new FileReader();
      reader.readAsDataURL(imgFile);
      reader.onloadend = async () => {
        const base64Image = reader.result;

        const requestData = {
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          email: data.workEmail,
          personalTaxIdentifierNumber: data.personalTaxIdentifierNumber,
          phoneNumber: data.phoneNumber,
          jobTitle: selectedJobTitle.title,
          level: selectedLevel.level,
          department: selectedDepartment.name,
          country: selectedCountry?.name,
          cityState: selectedCity?.name,
          startDate: selectedDate,
          photo: base64Image, 
        };
        if (location.state && location.state.employee) {
          const employeeId = employee._id;
        // Requête PUT pour la mise à jour de l'employé existant
        await axios.put(`http://localhost:5000/members/${userId}/employees/${employeeId}`, requestData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        }

        console.log(requestData)
        fetch(`http://localhost:5000/members/employees/${userId}`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        })
          .then(response => response.json())
          .then(responseData => {
            console.log("Réponse du serveur :", responseData);
          }

          )
          .catch(error => {
            console.error("Erreur lors de l'envoi du formulaire :", error);
          });
        setIsSaved(true);

      };
    } catch (error) {
      console.error("Erreur lors de l'envoi du formulaire :", error);
      // Affichez une erreur à l'utilisateur si nécessaire
    }
  };


  const employeeLevels = [
    { level: 'Junior', description: 'Entry-level position for beginners in the field.' },
    { level: 'Intermediate', description: 'Mid-level position with some experience and skills.' },
    { level: 'Senior', description: 'Experienced position with advanced skills and responsibilities.' },
    { level: 'Manager', description: 'Supervisory position overseeing a team or department.' },
    { level: 'Executive', description: 'Top-level management position with strategic decision-making.' },
    { level: 'Associate', description: 'Position with specialized skills supporting various functions.' },
    { level: 'Director', description: 'Leadership position responsible for a specific area or department.' },
    { level: 'Consultant', description: 'External expert providing specialized advice and guidance.' },
  ];

  const jobTitles = [
    { title: 'Software Engineer', department: 'Engineering' },
    { title: 'Marketing Manager', department: 'Marketing' },
    { title: 'Financial Analyst', department: 'Finance' },
    { title: 'HR Specialist', department: 'Human Resources' },
    { title: 'Product Manager', department: 'Product Management' },
    { title: 'Sales Representative', department: 'Sales' },
    { title: 'Data Scientist', department: 'Information Technology' },
    { title: 'Customer Success Manager', department: 'Customer Service' },
  ];

  const departments = [
    { name: 'Engineering' },
    { name: 'Marketing' },
    { name: 'Finance' },
    { name: 'Human Resources' },
    { name: 'Product Management' },
    { name: 'Customer Service' },
    { name: 'Sales' },
    { name: 'Research and Development' },
    { name: 'Information Technology' },
    { name: 'Operations' },
  ];

    
  return (
    <div className="bg-white-A700 flex flex-col gap-8 h-full min-h-screen items-start justify-start pb-8 pt-8 rounded-tl-[40px] overflow-y-auto w-full">
      <div className="flex items-start justify-start sm:px-5 px-8 w-full">
        <div className="border-b border-indigo-50 border-solid flex flex-row gap-5 items-start justify-start pb-6 w-full">
          <div className="flex flex-1 font-DmSans h-full items-start justify-start w-auto">
            <PageHeader
              >
              Company
            </PageHeader>
          </div>
          <SearchInput className={'min-w-[25%]'}/>
        </div>
      </div>
      <div className="flex items-start justify-start w-full">
        <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full" style={{ backgroundColor: "white" }}>
          <form className="w-full border border-gray-200 rounded-lg shadow border-gray-300"
            onSubmit={handleSubmit(onSubmit)}
            encType="multipart/form-data"
          >
            <div className="flex flex-row flex-wrap text-sm text-center text-gray-300 border-b border-gray-300 rounded-t-lg bg-white-A700 dark:border-gray-300 dark:text-gray-400  py-4 px-5">
              <Text
                className="text-lg leading-7 text-gray-900_01 pt-1"
                size="txtDmSansMedium16"
              >
                Add Employee
              </Text>
              {isSaved? 
              <button
                className="bg-teal-A700 text-base text-white-A700 flex flex-row md:h-auto items-center ml-auto p-[7px] rounded-md w-auto"
                type="submit"
              >
                <BsCheck2Circle size={18} className="mr-2" />
                Saved
              </button>
              :
              <button
                className="bg-blue-A400 text-base text-white-A700 flex flex-row md:h-auto items-center ml-auto p-[7px] rounded-md w-auto cursor-pointer"
                type="submit"
              >
                <FiSave size={18} className="mr-2" />
                Save
              </button>
              }
              
            </div>
            <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row 3xl:flex-row 2xl:flex-row gap-8 items-start justify-start px-5 md:px-5 w-full">
              <div className="flex flex-1 flex-col gap-6 py-5 items-start justify-start w-full">
                <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                  <Text
                    className="text-base text-gray-900_01 w-auto"
                    size="txtDMSansLablel"
                  >
                    First Name
                  </Text>
                  <div className="flex md:flex-1 w-full md:w-full rounded-md p-2 border border-solid">
                    <input
                      {...register("firstName", { required: { value: true, message: "Employee First Name is required" } })}
                      className={`!placeholder:text-blue_gray-300 !text-gray700 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent !border-0`}
                      type="text"
                      name="firstName"
                      placeholder="first Name"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    />
                  </div>
                  {errors.firstName && <span className="text-sm font-DmSans text-red-500">{errors.firstName?.message}</span>}
                </div>

                <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                  <Text
                    className="text-base text-gray-900_01 w-auto"
                    size="txtDMSansLablel"
                  >
                    Last Name
                  </Text>
                  <div className="flex md:flex-1 w-full md:w-full rounded-md p-2 border border-solid">
                    <input
                      {...register("lastName", { required: { value: true, message: "Employee Last Name is required" } })}
                      className={`!placeholder:text-blue_gray-300 !text-gray700 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent !border-0`}
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    />
                  </div>
                  {errors.lastName && <span className="text-sm font-DmSans text-red-500">{errors.lastName?.message}</span>}
                </div>

                <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                  <Text
                    className="text-base text-gray-900_01 w-auto"
                    size="txtDMSansLablel"
                  >
                    Work Email
                  </Text>
                  <div className="flex md:flex-1 w-full md:w-full rounded-md p-2 border border-solid">
                    <input
                      {...register("workEmail", { required: { value: true, message: "Employee Work Email is required" } })}
                      className={`!placeholder:text-blue_gray-300 !text-gray700 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                      type="text"
                      name="workEmail"
                      placeholder="Enter Work Email"
                      value={formData.workEmail}
                      onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                    />
                  </div>
                  {errors.workEmail && <span className="text-sm font-DmSans text-red-500">{errors.workEmail?.message}</span>}
                </div>
                <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                  <Text
                    className="text-base text-gray-900_01 w-auto"
                    size="txtDMSansLablel"
                  >
                    Personal Email
                  </Text>
                  <div className="flex md:flex-1 w-full md:w-full rounded-md p-2 border border-solid">
                    <input
                      {...register("personalEmail", { required: { value: true, message: "Employee personalEmail is required" } })}
                      className={`!placeholder:text-blue_gray-300 !text-gray700 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                      type="text"
                      name="personalEmail"
                      placeholder="Enter Personal Email"
                      value={formData.personalEmail}
                      onChange={(e) => setFormData({ ...formData, personalEmail: e.target.value })}
                    />
                  </div>
                  {errors.personalEmail && <span className="text-sm font-DmSans text-red-500">{errors.personalEmail?.message}</span>}
                </div>
                <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                  <Text
                    className="text-base text-gray-900_01 w-auto"
                    size="txtDMSansLablel"
                  >
                    Phone Number
                  </Text>
                  <div className="flex md:flex-1 w-full md:w-full rounded-md p-2 border border-solid">
                    <input
                      {...register("phoneNumber", { required: { value: true, message: "Employee Phone Number is required" } })}
                      className={`!placeholder:text-blue_gray-300 !text-gray700 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                      type="text"
                      name="phoneNumber"
                      placeholder="+212 - "
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    />
                  </div>
                  {errors.phoneNumber && <span className="text-sm font-DmSans text-red-500">{errors.phoneNumber?.message}</span>}
                </div>
                <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                  <Text
                    className="text-base text-gray-900_01 w-auto"
                    size="txtDMSansLablel"
                  >
                    Address
                  </Text>
                  <div className="flex md:flex-1 w-full md:w-full rounded-md p-2 border border-solid">
                    <input
                      {...register("address", { required: { value: true, message: "Employee address is required" } })}
                      className={`!placeholder:text-blue_gray-300 !text-gray700 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                      type="text"
                      name="address"
                      placeholder="Enter Address of Employee"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    />
                  </div>
                  {errors.address && <span className="text-sm font-DmSans text-red-500">{errors.address?.message}</span>}
                </div>
                <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                  <Text
                    className="text-base text-gray-900_01 w-auto"
                    size="txtDMSansLablel"
                  >
                    Country
                  </Text>
                  <SimpleSelect id='country'
                    options={dataCountries} onSelect={""}
                    searchLabel='Select Country'
                    setSelectedOptionVal={setSelectedCountry}
                    placeholder={formData.country ? formData.country : "Select Country"} valuekey="name"
                    content={
                      (option) => {
                        return (
                          <div className="flex  py-2 items-center  w-full">
                            <Text
                              className="text-gray-801 text-left text-base font-DmSans font-normal leading-5 w-auto"
                            >
                              {option.name}
                            </Text>
                          </div>
                        );
                      }
                    } />
                </div>
                <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                  <Text
                    className="text-base text-gray-900_01 w-auto"
                    size="txtDMSansLablel"
                  >
                    City/State
                  </Text>
                  <SimpleSelect id='city'
                    options={selectedCountry ? City.getCitiesOfCountry(selectedCountry['isoCode']) : []} onSelect={""} searchLabel='Select City' setSelectedOptionVal={setSelectedCity}
                    placeholder={formData.country ? formData.cityState : "Select City"} valuekey="name"
                    content={
                      (option) => {
                        return (
                          <div className="flex  py-2 items-center  w-full">
                            <Text
                              className="text-gray-801 text-left text-base font-DmSans font-normal leading-5 w-auto"
                            >
                              {option.name}
                            </Text>
                          </div>
                        );
                      }
                    } />
                </div>
                <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                  <Text
                    className="text-base text-gray-900_01 w-auto"
                    size="txtDMSansLablel"
                  >
                    Personal Tax Identifier Number
                  </Text>
                  <div className="flex md:flex-1 w-full md:w-full rounded-md p-2 border border-solid">
                    <input
                      {...register("personalTaxIdentifierNumber", { required: { value: true, message: "Employee Personal Tax Identifier Number is required" } })}
                      className={`!placeholder:text-blue_gray-300 !text-gray700 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                      type="text"
                      name="personalTaxIdentifierNumber"
                      value={formData.personalTaxIdentifierNumber ? formData.personalTaxIdentifierNumber : "None"}
                      onChange={(e) =>handleChange(e, "personalTaxIdentifierNumber")}
                      
                      placeholder="0000 - 0000 - 0000"

                    />
                  </div>
                  {errors.personalTaxIdentifierNumber && <span className="text-sm font-DmSans text-red-500">{errors.personalTaxIdentifierNumber?.message}</span>}
                </div>
              </div>
              <div className="flex py-5 flex-col items-start justify-start w-full md:w-[35%] lg:w-[35%] xl:w-[35%] 2xl:w-[35%] 3xl:w-[35%]">
                <div className="flex flex-col gap-6 items-start justify-start w-full">

                <div className="bg-white-A700 border border-blue_gray-100_01 border-solid flex flex-col items-center justify-center rounded-md w-full">
  <label htmlFor="fileInput" className="cursor-pointer">
    {imgFile ? (
      <img src={URL.createObjectURL(imgFile)} alt="Uploaded Logo" className="rounded-md w-full py-[5px] h-[200px]" />
    ) : formData.photo ? (
      <img src={`data:image/png;base64,${formData.photo}`} alt="Employee Photo" className="rounded-md w-full py-[5px] h-[200px]" />
    ) : (
      <div className="flex flex-col text-blue-500 gap-1.5 items-center justify-center px-3 py-[100px] rounded-md w-full">
        <PiUserSquare size={24} radius={8} className="" />
        <div className="flex flex-col items-start justify-start w-auto">
          <Text className="text-[13px] text-base leading-6 tracking-normal w-auto">
            Upload Your Logo
          </Text>
        </div>
      </div>
    )}
  </label>
  <input id="fileInput" type="file" onChange={handleFileChange} className="hidden" />
</div>



                  <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                    <Text
                      className="text-base text-gray-900_01 w-auto"
                      size="txtDMSansLablel"
                    >
                      Job Title
                    </Text>
                    <SimpleSelect
                      id='job'
                      options={jobTitles}
                      onSelect={(selectedOption) => setSelectedJobTitle(selectedOption)}
                      searchLabel="Select position / title"
                      setSelectedOptionVal={setSelectedJobTitle}
                      placeholder={formData.jobTitle ? formData.jobTitle : "Select position / title"}
                      valuekey="title"
                      content={(option) => {
                        return (
                          <div className="flex py-2 items-center w-full">
                            <Text className="text-gray-801 text-left text-base font-DmSans font-normal leading-5 w-auto">
                              {option.title}
                            </Text>
                          </div>
                        );
                      }}

                      value={selectedJobTitle}
                      onChange={e => handleChange(e, setSelectedJobTitle)}


                    />

                  </div>
                  <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                    <Text
                      className="text-base text-gray-900_01 w-auto"
                      size="txtDMSansLablel"
                    >
                      Level
                    </Text>
                    <SimpleSelect id='level' options={employeeLevels} onSelect={""} searchLabel='Select Level' setSelectedOptionVal={setSelectedLevel}
                      placeholder={formData.level ? formData.level : "Select employee level"}
                      valuekey="level"
                      content={
                        (option) => {
                          return (
                            <div className="flex  py-2 items-center  w-full">
                              <Text
                                className="text-gray-801 text-left text-base font-DmSans font-normal leading-5 w-auto"
                              >
                                {option.level}
                              </Text>
                            </div>
                          );
                        }
                      } />
                  </div>
                  <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                    <Text
                      className="text-base text-gray-900_01 w-auto"
                      size="txtDMSansLablel"
                    >
                      Department
                    </Text>
                    <SimpleSelect id='department' options={departments} onSelect={""} searchLabel='Select Department' setSelectedOptionVal={setSelectedDepartment}
                      placeholder={formData.department ? formData.department : "Select Department"}
                      valuekey="name"
                      content={
                        (option) => {
                          return (
                            <div className="flex  py-2 items-center  w-full">
                              <Text
                                className="text-gray-801 text-left text-base font-DmSans font-normal leading-5 w-auto"
                              >
                                {option.name}
                              </Text>
                            </div>
                          );
                        }
                      } />
                  </div>
                  <div className={`flex flex-col gap-2 items-start justify-start w-full`}>
                    <Text
                      className="text-base text-gray-900_01 w-auto"
                      size="txtDMSansLablel"
                    >
                      Start Date
                    </Text>
                    <CustomCalendar
                      className={' w-full'}
                      onChangeDate={(selectedDate) => setSelectedDate(selectedDate)}
                      inputPlaceholder={formData.startDate ? format(new Date(formData.startDate), 'dd/MM/yyyy') : 'DD/MM/YYYY'}
                    />
                    {/* <div className="flex md:flex-1 w-full md:w-full rounded-md p-2 border border-solid">
                      <input
                        {...register("startDate", { required: {value:true , message:"Employee Start Date is required"} })}
                        className={`!placeholder:text-blue_gray-300 !text-gray700 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                        type="text"
                        name="startDate"
                        placeholder="MM/DD/YYYY"
                        onFocus={(e) => {
                          setIsFocused(true)
                          e.target.type = 'date';
                        }}
                        onBlur={(e) => {
                          setIsFocused(false)
                          e.target.type = 'text';
                        }}
                      />
                      <MdOutlineDateRange size={20} className={`${isFocused ? 'hidden' : ''} text-blue_gray-300`}/>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewEmployee;