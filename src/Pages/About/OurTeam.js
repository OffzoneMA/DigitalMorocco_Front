import {React,useState}from 'react';
import TeamMemberCard from '../../Components/TeamMemberCard';
import teamMembers from '../../data/teamMembers';
import MemberDetails from '../../Components/MemberDetails';


export default function OurTeam(){
    const [selectedTeamMember, setSelectedTeamMember] = useState(null);

    const handleCardClick = (teamMember) => {
        setSelectedTeamMember(teamMember);
    };

    const handleCloseDetail = () => {
        setSelectedTeamMember(null);
    };

    return(
        <div className="py-16 ">
            <div className="space-y-5">
                <h2 className="text-gray700 text-center tracking-wider font-bold text-sm">OUR TEAM</h2>
                <p className="text-gray700 text-center font-bold text-3xl md:mx-60">Discover a dynamic and innovative business networking platform</p>
            </div>
            <div className="flex flex-col md:grid md:grid-cols-4 py-5 gap-10 px-3 md:gap-10 md:px-20 md:py-10  lg:px-40  xl:px-60 ">
                    {teamMembers?.map((teamMember, i) => (
                        <div key={i} className="">
                            <TeamMemberCard teamMember={teamMember}  onClick={() => handleCardClick(teamMember)}/>
                        </div>
                       
            ))}
            
            {selectedTeamMember && (
                <div className="fixed top-0 left-0 right-0 w-full h-full bg-[#1D2939C2] bg-opacity-75 flex justify-center items-center ">
                <MemberDetails
                    teamMember={selectedTeamMember}
                    onClose={handleCloseDetail}
                />
                </div>
            )}
            
          
                {/* <div className="space-y-2">
                    <img src="/img/Placeholder1.png" alt="" className=""/>
                    <h2 className="text-color1 text-center font-semibold text-lg ">Xavier Oswald</h2>
                    <p className="text-color2 text-center font-medium text-medium">founder, CEO</p>
                </div>
                <div className="space-y-2">
                    <img src="/img/Placeholder2.png" alt="" className=""/>
                    <h2 className="text-color1 text-center font-semibold text-lg ">Sara Creighton</h2>
                    <p className="text-color2 text-center font-medium text-medium">Co-founder, CFO</p>
                </div>
                <div className="space-y-2">
                    <img src="/img/Placeholder3.png" alt="" className=""/>
                    <h2 className="text-color1 text-center font-semibold text-lg ">Brandon Ogden</h2>
                    <p className="text-color2 text-center font-medium text-medium">CTO</p>
                </div>
                <div className="space-y-2">
                    <img src="/img/Placeholder4.png" alt="" className=""/>
                    <h2 className="text-color1 text-center font-semibold text-lg ">Allison Gardner</h2>
                    <p className="text-color2 text-center font-medium text-medium">COO</p>
                </div>*/}
            </div> 
        </div>
    )
}