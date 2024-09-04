import React, { useEffect, useState } from 'react'
import { userLogApi } from '../Services/UserLog.Service';
import Event from '../Pages/Admin/History/Event';

export default function UserEvents() {
    const [start, setStart] = useState(0);
    const [qt, setQt] = useState(8);
    const [events, setevents] = useState([]);
    const [trigger, { data, isFetching, status }, lastPromiseInfo] = userLogApi.endpoints.getAllEventsByUser.useLazyQuery()



    useEffect(() => {
        setevents([])
        trigger({
            start: 0,
            qt,
        })
    }, [])

    useEffect(() => {
        if (data?.length > 0) {
            setevents((prevEvents) => [...prevEvents, ...data]);
            setStart(data?.length + events?.length)
        }
    }, [data])



    return (
        <div className="">
            <div className="max-h-[75vh]  p-7 overflow-scroll">
                <table className="w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-4  text-gray700 text-center   font-semibold">
                                Email
                            </th>
                            <th className="px-6 py-4  text-gray700 text-center   font-semibold">
                                Role
                            </th>
                            <th className="px-6 py-4  text-gray700 text-center   font-semibold">
                                Date Event
                            </th>
                            <th className="px-6 py-4  text-gray700 text-center   font-semibold">
                                Event
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            events.length > 0 &&
                            events.map((el, i) => (
                                <Event event={el} key={i} />
                            ))
                        }

                    </tbody>
                </table>


            </div>


            {isFetching && <div className="text-center text-xl p-8">Loading...</div>}
            {events && events.length == 0 && <div className="text-center text-xl p-8">No Events Found</div>}
            <div className="flex justify-center  p-8">
                <button
                    disabled={isFetching || data?.length == 0 || events.length < qt}
                    onClick={() => {
                        trigger({
                            start,
                            qt,
                        })
                    }}
                    className="bg-green-800 px-4 py-2 rounded-3xl text-white disabled:cursor-not-allowed disabled:bg-green-800/10">
                    {isFetching ? 'Loading ...' : "Get More"}
                </button>
            </div>

        </div>
    );
};
