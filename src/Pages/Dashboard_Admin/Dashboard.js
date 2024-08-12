import React, { useState, useEffect } from "react";
import { Text } from "../../Components/Text";
import { GoRocket } from "react-icons/go";
import { TiFlashOutline } from "react-icons/ti";
import { BiBuildings } from "react-icons/bi";
import { FaArrowTrendUp } from "react-icons/fa6";
import { AreaChart, XAxis, Tooltip, Area, ResponsiveContainer } from 'recharts';
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
  const monthsOrder1 = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const [members, setMembers] = useState([]);
  const [investors, setInvestors] = useState([]);
  const [partners, setPartners] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [role, setRole] = useState('member');
  const [timeFrame, setTimeFrame] = useState('month');
  const currentMonthIndex = new Date().getMonth();
  const [selectedMonth, setSelectedMonth] = useState(monthsOrder1[currentMonthIndex]);
  const [chartData, setChartData] = useState([]);
  const [chartDataPreviousYear, setChartDataPreviousYear] = useState([]);

  const monthsOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const handleGridClick = (gridId, option) => {
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


  // useEffect(() => {
  //   if (users) {
  //     const filteredUsers = users;
  //     const roleUsers = filteredUsers.filter(user => user.role === role);

  //     const monthOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  //     const currentYear = new Date().getFullYear();
  //     const currentMonth = new Date().getMonth(); // Get the current month index (0-11)
  //     const previousYear = currentYear - 1;

  //     const usersByMonthCurrentYear = roleUsers.reduce((acc, user) => {
  //       const userDate = new Date(user.dateCreated);
  //       if (userDate.getFullYear() === currentYear && userDate.getMonth() <= currentMonth) {
  //         const monthIndex = userDate.getMonth();
  //         const month = monthOrder[monthIndex];
  //         acc[month] = (acc[month] || 0) + 1;
  //       }
  //       return acc;
  //     }, {});

  //     const usersByMonthPreviousYear = roleUsers.reduce((acc, user) => {
  //       const userDate = new Date(user.dateCreated);
  //       if (userDate.getFullYear() === previousYear && userDate.getMonth() <= currentMonth) {
  //         const monthIndex = userDate.getMonth();
  //         const month = monthOrder[monthIndex];
  //         acc[month] = (acc[month] || 0) + 1;
  //       }
  //       return acc;
  //     }, {});

  //     const dataCurrentYear = monthOrder.slice(0, currentMonth + 1).map(month => ({
  //       name: month,
  //       value: usersByMonthCurrentYear[month] || 0,
  //     }));

  //     const dataPreviousYear = monthOrder.slice(0, currentMonth + 1).map(month => ({
  //       name: month,
  //       value: usersByMonthPreviousYear[month] || 0,
  //     }));

  //     setChartData(dataCurrentYear);
  //     setChartDataPreviousYear(dataPreviousYear);
  //   }
  // }, [users, role]);

  const groupUsersByMonth = (users, year) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const grouped = {};
  
    users.forEach(user => {
      const date = new Date(user.dateCreated);
      if (date.getFullYear() === year) {
        const month = months[date.getMonth()];
        if (!grouped[month]) {
          grouped[month] = 0;
        }
        grouped[month]++;
      }
    });
  
    return grouped;
  };

  const groupUsersByWeek = (users, year, month) => {
    const grouped = {};

    users.forEach(user => {
      const date = new Date(user.dateCreated);
      if (date.getFullYear() === year && date.getMonth() === monthsOrder1.indexOf(month) ) {
        const week = `Week ${Math.ceil((date.getDate() + (new Date(date.getFullYear(), date.getMonth(), 1).getDay() + 1)) / 7)}`;
        if (!grouped[week]) {
          grouped[week] = 0;
        }
        grouped[week]++;
      }
    });

    return grouped;
  };

  const formatChartData = (groupedData, timeFrame) => {
    const timeFrames = timeFrame === 'month' 
      ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      : Array.from({ length: 5 }, (_, i) => `Week ${i + 1}`);
    
    return timeFrames.map(frame => ({
      name: frame,
      value: groupedData[frame] || 0
    }));
  };

  useEffect(() => {
    if (users) {
      const currentYear = new Date().getFullYear()
      const roleUsers = users.filter(user => user.role === role);
      const groupedData = timeFrame === 'month' ? groupUsersByMonth(roleUsers , currentYear) : groupUsersByWeek(roleUsers , currentYear , selectedMonth);
      const formattedData = formatChartData(groupedData, timeFrame);
      setChartData(formattedData);
    }
  }, [users, role, timeFrame, selectedMonth]);

  const gradientOffset = () => {
    const data = chartData;
    if (data.length > 0) {
      const sortedData = data.slice().sort((a, b) => a.value - b.value);
      return sortedData[0].value;
    }
    return 0;
  };

  const off = gradientOffset();

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { name, value } = payload[0].payload;
      return (
        <div className="custom-tooltip flex flex-row bg-transparent">
          <p className="label" onClick={() => setSelectedMonth(name)}>{name}: <span className="text-[#45C68A] ">{value}</span></p>
        </div>
      );
    }

    return null;
  };

  const CustomTick = (props) => {
    const { x, y, payload } = props;
    return (
        <g transform={`translate(${x},${y})`}>
            <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">
                {payload.value}
            </text>
        </g>
    );
};

   const handleChartClick = (data) => {
    if (data && data.activeLabel) {
      const clickedMonthAbbreviated = data.activeLabel;
      const monthIndex = monthsOrder.indexOf(clickedMonthAbbreviated);
      if (monthIndex !== -1) {
        const clickedMonthFull = monthsOrder1[monthIndex];
        setSelectedMonth(clickedMonthFull);
        setTimeFrame('week');
      }
    }
  };

  const handleSelectMonth = (month)  => {
    setSelectedMonth(month);
    setTimeFrame('week');
  }

  console.log(chartData)

  return (
    <div className="bg-white-A700 flex flex-col gap-8 h-full min-h-screen items-start justify-start pb-8 pt-8 rounded-tl-[40px]  w-full">
      <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
        <div className="flex flex-col md:flex-row gap-5 items-start justify-start pb-2 w-full">
          <div className="flex flex-1 h-full items-start justify-start w-auto">
            <PageHeader
            >
              Welcome back, {userInfo?.displayName ? userInfo?.displayName : 'Olivia'}
            </PageHeader>
          </div>
          <SearchInput className={'min-w-[25%]'} />
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
            className={`flex flex-col basis-[230px] grow max-w-[600px] gap-3 items-center rounded-[12px] border animation py-7 px-5 hover:border-blue-503 hover:shadow-roleCardbs ${role === 'member' ? 'border-blue-503 shadow-roleCardbs' : 'border-gray-201'}`}
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
            className={`flex flex-col basis-[230px] grow max-w-[600px] gap-3 items-center rounded-[12px] border animation py-7 px-5 hover:border-blue-503 hover:shadow-roleCardbs ${role === 'investor' ? 'border-blue-503 shadow-roleCardbs' : 'border-gray-201'}`}
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
            className={`flex flex-col basis-[230px] grow max-w-[600px] gap-3 items-center rounded-[12px] border animation py-7 px-5 hover:border-blue-503 hover:shadow-roleCardbs ${role === 'partner' ? 'border-blue-503 shadow-roleCardbs' : 'border-gray-201'}`}
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
            <div className="flex flex-row items-center w-full justify-between">
              <div className="flex flex-row items-center w-full">
                <div className="flex rounded-md bg-violet-100 p-2">
                  <FaArrowTrendUp size={28} className="text-blue-601 " />
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
              <div className="flex flex-row items-center justify-center border border-gray_200 px-[9px] py-[7px] rounded-[48px] w-auto gap-2.5">
                <div className="h-[19px] text-[13px] text-[#303030] font-Montserrat-semiBold " style={{whiteSpace: 'nowrap'}}>Show by:</div>
                <div className="w-auto justify-start items-center gap-2.5 flex">
                  <div className="px-3 py-[3px] bg-[#AAAAAA1A] rounded-[100px] justify-center items-center gap-2.5 flex" onClick={() => setTimeFrame('week')}>
                    <div className={`${timeFrame === 'week' ? 'text-purple-500' : 'text-[#303030]' } text-sm font-medium font-dm-sans-regular`}>Week</div>
                  </div>
                  <div className={`px-3 py-[3px] bg-[#AAAAAA1A] rounded-[100px] justify-center items-center gap-2.5 flex`} onClick={() => setTimeFrame('month')}>
                    <div className={`${timeFrame === 'month' ? 'text-purple-500' : 'text-[#303030]' } text-sm font-normal font-dm-sans-regular`}>Month</div>
                  </div>
                  <div className={`px-3 py-[3px] bg-[#AAAAAA1A] rounded-[100px] justify-center items-center gap-2.5 flex relative`} 
                  onMouseEnter={() => setIsOpen(true)}
                  onMouseLeave={() => setIsOpen(false)}
                  onClick={() => setIsOpen(!isOpen)}
                  >
                    <div className="text-[#303030] text-sm font-normal font-dm-sans-regular" style={{whiteSpace: 'nowrap'}}>{selectedMonth || 'Select Month'}</div>
                    {isOpen && (
                      <div className="absolute top-full right-0 z-10 ">
                        <div className="flex flex-col justify-start items-start mt-1 max-h-[310px] px-4 py-5 bg-white-A700 rounded-xl border border-gray-201 shadow-lg gap-2.5  overflow-y-auto">
                          {monthsOrder1.map((month, index) => (
                            <div
                              key={index}
                              className="flex items-center w-full px-3 text-left hover-select-color hover:text-[#35D8BF] cursorpointer text-[#1d2838] text-sm font-dm-sans-regular capitalize"
                              onClick={() => handleSelectMonth(month)}
                            >
                              {month}
                            </div>
                          ))}
                        </div>
                      </div>
                  )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full ">
              {chartData.length > 0 ?
                <div className="flex-grow">
                  <ResponsiveContainer width="100%" height={280}>
                    <AreaChart data={chartData} onClick={handleChartClick}>
                      <XAxis dataKey="name" padding={{ left: timeFrame === 'week' ? 23 : 8, right: 0 }}
                       tick={{ fontSize: 12 }}
                      />
                      <Tooltip content={<CustomTooltip />} />
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