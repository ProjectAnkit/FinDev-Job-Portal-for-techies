import React from "react";
import Image from "next/image";
import { BsDot } from "react-icons/bs";
import { useRouter } from "next/router";

export default function JobsCard({ job, posted }) {
  const router = useRouter();

  return (
    <div
      key={job._id}
      className="w-80 h-40 bg-white rounded-2xl shadow-[0_8px_24px_rgba(58,107,58,0.2)] p-4 flex flex-col justify-between transition-transform duration-300 hover:scale-[1.02]"
    >
      {/* Header */}
      <div className="flex items-center gap-4">
        <Image
          width={45}
          height={45}
          className="rounded-full border border-gray-300 object-cover"
          src={
            job?.user?.image ||
            "https://xsgames.co/randomusers/avatar.php?g=male"
          }
          alt="User Profile"
        />
        <div>
          <h1 className="text-base font-semibold text-gray-900">
            {job?.user?.name}
          </h1>
          <p className="text-sm text-gray-500">{job?.company}</p>
        </div>
      </div>

      {/* Job Info */}
      <div className="mt-1 text-sm text-gray-700 space-y-1">
        <div className="flex items-center">
          <BsDot className="text-xl text-[#3a6b3a]" />
          <span className="font-medium w-20">Salary:</span>
          <span className="ml-1">₹{job?.salary}/month</span>
        </div>
        <div className="flex items-center">
          <BsDot className="text-xl text-[#3a6b3a]" />
          <span className="font-medium w-20">Deadline:</span>
          <span className="ml-1">
            {new Date(`${job?.job_deadline}`).toLocaleDateString("en-GB")}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-2">
        <span className="text-xs px-3 py-1 rounded-full bg-[#3a6b3a]/10 text-[#3a6b3a] font-semibold capitalize">
          {job?.title}
        </span>
        <button
          onClick={() => router.push(`/frontend/jobDetails/${job?._id}`)}
          className="bg-[#3a6b3a] hover:bg-[#2d522d] text-white px-3 py-1 rounded-md text-xs font-medium"
        >
          View Detail
        </button>
      </div>
    </div>
  );
}
