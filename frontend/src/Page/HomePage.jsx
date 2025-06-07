import React, { useEffect } from "react";
import { useProblemStore } from "../store/useProblemStore";
import { Loader } from "lucide-react";
import ProblemTable from "../components/ProblemTable";

const HomePage = () => {
  const { getAllProblems, isProblemsLoading, problems } = useProblemStore();

  useEffect(() => {
    getAllProblems();
  }, [getAllProblems]);

  if (isProblemsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="size-10 animate-spin " />
        <span className="sr-only">Loading authentication status...</span>
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] flex flex-col gap-5 p-5">
      <span className="text-lg text-center md:text-5xl font-bold tracking-tigh hidden md:block">
        Welcome to
        <span className="text-[#FFA726]"> Quest4Code</span>
      </span>
      <div className="flex gap-5 px-20 justify-between md:flex-row flex-col">
        <div className="flex flex-col gap-5">
          <h2 className="text-4xl">Practice coding </h2>
          <h3 className="text-3xl">Level up your coding skills.</h3>
          <button>Get Started</button>
        </div>
        <div className="border rounded-2xl p-5">
          <p className="border-b-2">Two sum</p>
          <br />
          <pre className="border-b pb-4">
            {`def twoSum(nums: List[int], target: int) -> List[int]:
  seen = {}
  for i, num in enumerate(nums):
      diff = target - num
      if diff in seen:
          return [seen[diff], i]
      seen[num] = i`}
          </pre>
          <div className="flex justify-between mt-4">
            <button className="rounded-md border w-20 p-2">run</button>
            <button className="rounded-md border w-20 bg-white text-black p-2">
              submit
            </button>
          </div>
        </div>
      </div>
      <ProblemTable problems={problems} />
    </div>
  );
};

export default HomePage;
