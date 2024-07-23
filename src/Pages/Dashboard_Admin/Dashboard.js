import React, { useState  , useEffect } from "react";
import { Text } from "../../Components/Text";
import { GoRocket } from "react-icons/go";
import { TiFlashOutline } from "react-icons/ti";
import { BiBuildings } from "react-icons/bi";
import { FaArrowTrendUp } from "react-icons/fa6";
import { AreaChart, XAxis,Tooltip, Area, ResponsiveContainer } from 'recharts';
import { AiOutlineFileSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import PageHeader from "../../Components/PageHeader";
import SearchInput from "../../Components/SeachInput";
import { useGetAllUsersQuery } from "../../Services/User.Service";


const Dashboard_Admin = () => {
    const { userInfo } = useSelector((state) => state.auth)
    const navigate = useNavigate();

    const { data: users, error, isLoading } = useGetAllUsersQuery();

    const [members, setMembers] = useState([]);
    const [investors, setInvestors] = useState([]);
    const [partners, setPartners] = useState([]);

    const [role, setRole] = useState('member');
    const [chartData, setChartData] = useState([]);
    const [chartDataPreviousYear, setChartDataPreviousYear] = useState([]);

    const monthsOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const handleGridClick = (gridId , option) => {
        setRole(option);
    };

    useEffect(() => {
        if (users) {
            // const filteredUsers = users.filter(user => user.status === 'accepted' || user.status === 'pending');
            const filteredUsers = users;
            const members = filteredUsers.filter(user => user.role === 'member');
            const investors = filteredUsers.filter(user => user.role === 'investor');
            const partners = filteredUsers.filter(user => user.role === 'partner');

            setMembers(members);
            setInvestors(investors);
            setPartners(partners);
        }
    }, [users]);

    const groupUsersByMonth = (users) => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const grouped = {};
    
        users.forEach(user => {
            const date = new Date(user.dateCreated); 
            const month = months[date.getMonth()];
            if (!grouped[month]) {
                grouped[month] = 0;
            }
            grouped[month]++;
        });
    
        return grouped;
    };
    
    const formatChartData = (groupedData) => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return months.map(month => ({
            name: month,
            value: groupedData[month] || 0
        }));
    };
    

    // const chartData = [
    //     { name: 'Jan', value: 150 },
    //     { name: 'Jan', value: 145 },
    //     { name: 'Jan', value: 240 },
    //     { name: 'Feb', value: 140 },
    //     { name: 'Mar', value: 420 },
    //     { name: 'Apr', value: 300 },
    //     { name: 'May', value: 400 },
    //     { name: 'Jun', value: 410 },
    //     { name: 'Jul', value: 550 },
    //     { name: 'Feb', value: 420 },
    //     { name: 'Mar', value: 580 },
    //     { name: 'Apr', value: 555 },
        
    //   ];

    useEffect(() => {
        if (users) {
            const filteredUsers = users;
            const roleUsers = filteredUsers.filter(user => user.role === role);

            const monthOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            const currentYear = new Date().getFullYear();
            const currentMonth = new Date().getMonth(); // Get the current month index (0-11)
            const previousYear = currentYear - 1;

            const usersByMonthCurrentYear = roleUsers.reduce((acc, user) => {
                const userDate = new Date(user.dateCreated);
                if (userDate.getFullYear() === currentYear && userDate.getMonth() <= currentMonth) {
                    const monthIndex = userDate.getMonth();
                    const month = monthOrder[monthIndex];
                    acc[month] = (acc[month] || 0) + 1;
                }
                return acc;
            }, {});

            const usersByMonthPreviousYear = roleUsers.reduce((acc, user) => {
                const userDate = new Date(user.dateCreated);
                if (userDate.getFullYear() === previousYear && userDate.getMonth() <= currentMonth) {
                    const monthIndex = userDate.getMonth();
                    const month = monthOrder[monthIndex];
                    acc[month] = (acc[month] || 0) + 1;
                }
                return acc;
            }, {});

            const dataCurrentYear = monthOrder.slice(0, currentMonth + 1).map(month => ({
                name: month,
                value: usersByMonthCurrentYear[month] || 0,
            }));

            const dataPreviousYear = monthOrder.slice(0, currentMonth + 1).map(month => ({
                name: month,
                value: usersByMonthPreviousYear[month] || 0,
            }));

            setChartData(dataCurrentYear);
            setChartDataPreviousYear(dataPreviousYear);
        }
    }, [users, role]);
    

      const gradientOffset = () => {
        const data = chartData;
        if (data.length > 0) {
          const sortedData = data.slice().sort((a, b) => a.value - b.value);
          return sortedData[0].value;
        }
        return 0;
      };
      
      const off = gradientOffset(); 


    //   const CustomTooltip = ({ active, payload, label }) => {
    //     if (active && payload && payload.length) {
    //       return (
    //         <div className="custom-tooltip flex flex-row bg-transparent">
    //           <p className="label ">{`${label}`}: <span className="text-[#45C68A] ">{`${payload[0].value}`}</span></p>
    //         </div>
    //       );
    //     }
      
    //     return null;
    //   };

      const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
          const { name, value } = payload[0].payload;
          return (
            <div className="custom-tooltip flex flex-row bg-transparent">
              <p className="label ">{name}: <span className="text-[#45C68A] ">{value}</span></p>
            </div>
          );
        }
      
        return null;
      };

    return (
        <div className="bg-white-A700 flex flex-col gap-8 h-full min-h-screen items-start justify-start pb-8 pt-8 rounded-tl-[40px]  w-full">
            <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
                <div className="flex flex-col md:flex-row gap-5 items-start justify-start pb-2 w-full">
                    <div className="flex flex-1 h-full items-start justify-start w-auto">
                        <PageHeader
                        >
                        Welcome back, {userInfo?.displayName? userInfo?.displayName : 'Olivia'}
                        </PageHeader>
                    </div>
                    <SearchInput className={'min-w-[25%]'}/>
                </div>
                <div className="flex pb-6">
                     <Text
                        className="text-lg font-inter text-gray-500 leading-6 tracking-normal w-full"
                        >
                        Track, manage and forecast your customers and orders.
                    </Text>
                </div>
                <div className="flex flex-wrap justify-center gap-10 pt-8 w-full">
                  <div
                    className={`flex flex-col basis-[180px] grow gap-3 items-center rounded-[12px] border animation py-7 px-5 hover:border-blue-503 hover:shadow-roleCardbs ${role === 'member' ? 'border-blue-503 shadow-roleCardbs' : 'border-gray-201'}`}
                    onClick={() => handleGridClick(1, 'member')}
                  >
                    <div className="rounded-[6px] p-2 bg-teal-50">
                      <GoRocket size={28} fontWeight={400} className="text-emerald-600" />
                    </div>
                    <Text className="text-[18px] mt-2 font-dm-sans-medium leading-7 tracking-normal text-gray-900_01">
                      Start Up
                    </Text>
                    <Text className="text-sm text-center font-dm-sans-regular leading-[26px] tracking-normal text-blue_gray-301">
                      Total registered startups
                    </Text>
                    <Text className="text-[#2575F0] text-[22px] leading-relaxed font-dm-sans-medium">
                      {members?.length}
                    </Text>
                  </div>

                  <div
                    className={`flex flex-col basis-[180px] grow gap-3 items-center rounded-[12px] border animation py-7 px-5 hover:border-blue-503 hover:shadow-roleCardbs ${role === 'investor' ? 'border-blue-503 shadow-roleCardbs' : 'border-gray-201'}`}
                    onClick={() => handleGridClick(2, 'investor')}
                  >
                    <div className="rounded-[6px] p-2 bg-blue-51">
                      <TiFlashOutline size={28} className="text-blue-701" />
                    </div>
                    <Text className="text-[18px] mt-2 font-dm-sans-medium leading-7 tracking-normal text-gray-900_01">
                      Investors
                    </Text>
                    <Text className="text-sm text-center font-dm-sans-regular leading-[26px] tracking-normal text-blue_gray-301">
                      Total registered Investors
                    </Text>
                    <Text className="text-[#2575F0] text-[22px] leading-relaxed font-dm-sans-medium">
                      {investors?.length}
                    </Text>
                  </div>

                  <div
                    className={`flex flex-col basis-[180px] grow gap-3 items-center rounded-[12px] border animation py-7 px-5 hover:border-blue-503 hover:shadow-roleCardbs ${role === 'partner' ? 'border-blue-503 shadow-roleCardbs' : 'border-gray-201'}`}
                    onClick={() => handleGridClick(3, 'partner')}
                  >
                    <div className="rounded-[6px] p-2 bg-violet-100">
                      <BiBuildings size={28} className="text-blue-601" />
                    </div>
                    <Text className="text-[18px] mt-2 font-dm-sans-medium leading-7 tracking-normal text-gray-900_01">
                      Partners
                    </Text>
                    <Text className="text-sm text-center font-dm-sans-regular leading-[26px] tracking-normal text-blue_gray-301">
                      Total registered Partners
                    </Text>
                    <Text className="text-[#2575F0] text-[22px] leading-relaxed font-dm-sans-medium">
                      {partners?.length}
                    </Text>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-10 pt-8 w-full">
                   <div className="flex flex-col gap-4 items-center rounded-[12px] border border-gray-200 px-6">
                    <div className="flex flex-row items-center w-full">
                     <div className="flex rounded-md bg-violet-100 p-2">
                       <FaArrowTrendUp size={28} className="text-blue-601 "/>
                     </div>
                     <div className="flex flex-col p-3 items-center gap-1 ml-2">
                        <Text
                            className=" ext-base font-dm-sans-medium leading-8 text-gray-900_01 tracking-normal w-full"
                            >
                           Sign-Up Volume 
                        </Text>
                        <Text
                            className="text-sm font-dm-sans-regular leading-[26px] text-blue_gray-301 tracking-normal  w-full"
                            >
                            Track Sign-Up Volume Trends Over Time!
                        </Text>
                      </div>
                    </div>
                    <div className="flex flex-col w-full ">
                      {chartData.length > 0 ? 
                        <div className="flex-grow">
                            <ResponsiveContainer width="100%" height={260}>
                                <AreaChart data={chartData}>
                                <XAxis dataKey="name" style={{display:'none'}}/>
                                <Tooltip content={<CustomTooltip />}/>
                                <defs>
                                    <linearGradient id="colorvalue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={"#A9FCE5"} stopOpacity={0.8} />
                                        <stop offset="95%" stopColor={"#A9FCE5"} stopOpacity={0} />
                                    </linearGradient>
                                    </defs>
                                    <Area type="monotone" dataKey="value" stroke="#45C68A" strokeWidth={2} fill="url(#colorvalue)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                        :
                        <div className="flex flex-col items-center text-gray-600 w-full py-28">
                            <AiOutlineFileSearch size={30} />
                            <Text
                            className=" text-sm font-dm-sans-regular leading-6 text-gray-900_01 w-auto"
                            size=""
                            >
                            Data not available
                            </Text>
                        </div>
                      }
                    </div>
                   </div>
                </div>
            </div>
        </div>
    )
}
export default Dashboard_Admin;