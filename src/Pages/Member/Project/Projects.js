import React, { useState, useEffect } from "react";
import { FiEdit3 } from "react-icons/fi";
import { FaRegPlusSquare } from "react-icons/fa";
import { HiOutlineTrash } from "react-icons/hi";
import { useSearchParams, useNavigate } from "react-router-dom";
import TablePagination from "../../../Components/common/TablePagination";
import DeleteModal from "../../../Components/common/DeleteModal";
import { useGetAllProjectsQuery } from "../../../Services/Member.Service";
import { useDeleteProjectMutation } from "../../../Services/Project.Service";
import Loader from "../../../Components/Loader";
import PageHeader from "../../../Components/common/PageHeader";
import TableTitle from "../../../Components/common/TableTitle";
import SearchInput from "../../../Components/common/SeachInput";
import fileSearchImg from "../../../Media/file-search.svg";
import { useTranslation } from "react-i18next";
import StatusBadge from "../../../Components/common/StatusBadge";
import EmailExistModalOrConfirmation from "../../../Components/Modals/EmailExistModalOrConfirmation";
import checkVerified from "../../../Media/check-verified-02.svg";
import HelmetWrapper from "../../../Components/common/HelmetWrapper";
import CommonModal from "../../../Components/common/CommonModal";
import { PRICING_COST_CONFIG } from "../../../data/data";
import { SUBSCRIPTION_LIMITS } from "../../../data/data";
import {
  useDeductionCreditsMutation,
  useCheckSubscriptionStatusQuery,
} from "../../../Services/Subscription.Service";
import { useGetUserDetailsQuery } from "../../../Services/Auth";
import { useGetTheDraftProjectQuery } from "../../../Services/Project.Service";
import email_error from "../../../Media/emailError.svg";
import ProjectsToMaskModal from "../../../Components/Modals/ProjectsToMaskModal";

const Projects = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { refetch: refetchUser } = useGetUserDetailsQuery();
  const [deleteProject] = useDeleteProjectMutation();
  const { data: draftProject, refetch: refetchDraft } = useGetTheDraftProjectQuery();
  const { data: subscriptionData, refetch: refetchSubscription } = useCheckSubscriptionStatusQuery();
  const [deductCredits] = useDeductionCreditsMutation();
  const [deleteSuccesModal, setDeleteSuccesModal] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteRow, setDeleteRow] = useState(null);
  const [searchParams] = useSearchParams();
  const [cur, setCur] = useState(1);
  const itemsPerPage = 8;
  const itemsToShow = 4;
  const [totalPages, setTotalPages] = useState(0);
  const { data, isLoading, refetch } = useGetAllProjectsQuery({
    page: cur,
    pageSize: itemsPerPage,
  });
  // const data = projectsData;

  const [openCreditsModal, setOpenCreditsModal] = useState(false);
  const [openCreateProjectProgressModal, setOpenCreateProjectProgressModal] =
    useState(false);
  const [confirmCreditsSending, setConfirmCreditsSending] = useState(false);
  const [deductionCreditsError, setDeductionCreditsError] = useState("");
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [totalProjectsToMask, setTotalProjectsToMask] = useState(0);
  const [totalProjectsToUnmask, setTotalProjectsToUnmask] = useState(0);
  const [openChooseProjectToMaskModal, setOpenChooseProjectToMaskModal] = useState(false);

  const pageData = data?.projects;

  // const allowedProjectCount =
  //   SUBSCRIPTION_LIMITS[
  //   subscriptionData?.plan
  //     ? subscriptionData?.plan?.name?.toLowerCase()
  //     : "basic"
  //   ];

  // const sortedProjects = [...(data?.projects || [])].sort(
  //   (a, b) => new Date(b.dateCreated) - new Date(a.dateCreated)
  // );

  // const permittedProjects = sortedProjects?.slice(0, allowedProjectCount);
  // const restrictedProjects = sortedProjects?.slice(allowedProjectCount);

  useEffect(() => {
    const pageFromUrl = parseInt(searchParams.get("page")) || 1;
    setCur(pageFromUrl);
  }, [searchParams]);

  useEffect(() => {
    refetch();
  }, [cur, refetch]);

  useEffect(() => {
    refetchDraft();
    refetchSubscription();
  }, [refetchDraft, refetchSubscription]);

  useEffect(() => {
    setTotalPages(data?.totalPages);
  }, [data]);

  useEffect(() => {
    if (deductionCreditsError?.trim()) {
      setOpenErrorModal(true);
    }
  }, [deductionCreditsError]);

  // Desactiver le bouton de creation de projet si le nombre de projet deja existant
  // est superieur ou egal au max permit par l'abonnement de l'utilisateur ( subscriptionData : objet)
  const isCreateProjectDisabled = () => {
    switch (subscriptionData?.plan?.name) {
      case "Basic":
        return pageData?.length >= 1;
      case "Standard":
        return pageData?.length >= 4;
      case "Premium":
        return pageData?.length >= 10;
      default:
        return pageData?.length >= 1; // Default case if no plan matches
    }
  };

  // function handlePageChange(page) {
  //   if (page >= 1 && page <= totalPages) {
  //     setCur(page);
  //   }
  // }

  const openDeleteModal = (rowData) => {
    setIsDeleteModalOpen(true);
    setDeleteRow(rowData);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const clodeDeleteSuccessModal = () => {
    setDeleteSuccesModal(false);
  };

  const handleDelete = async () => {
    try {
      await deleteProject(deleteRow?._id);
      closeDeleteModal();
      setDeleteSuccesModal(true);
      refetch();
    } catch (error) {
      console.error("Erreur lors de la suppression du projet :", error);
    }
  };

  const handreReduceCreditsForAddProject = async () => {
    setConfirmCreditsSending(true);

    try {
      const response = await deductCredits({
        credits: Number(PRICING_COST_CONFIG.ADD_PROJECT_COST),
        serviceType: "ADD_PROJECT",
      }).unwrap();

      if (response.success) {
        setOpenCreditsModal(false);
        await Promise.all([
          refetchUser(),
          refetchSubscription(),
          refetchDraft()
        ]);
        setConfirmCreditsSending(false);
        navigate("/CreateProject");
      } else {
        console.error("Failed to deduct credits:", response.message);
        setDeductionCreditsError(
          response?.message || "An error occurred while deducting credits."
        );
      }
    } catch (error) {
      console.error("Error reducing credits:", error);
      setDeductionCreditsError(
        error?.data?.error ||
        error?.data?.message ||
        error?.message ||
        "An error occurred while deducting credits."
      );
    }
  };

  const handleCreateProjectBtnClick = () => {
    // Check if the  draft project exists
    if (draftProject && draftProject?._id) {
      setOpenCreateProjectProgressModal(true);
    } else {
      // If it doesn't exist, open the modal to create a new project
      setOpenCreditsModal(true);
    }
  };


  useEffect(() => {
    if (!subscriptionData || !pageData) return;

    const previousPlanInfo = subscriptionData?.previousPlanInfo;
    const currentPlan = subscriptionData?.plan;

    if (!previousPlanInfo || !currentPlan) return;

    const isMember = previousPlanInfo.userRole?.toLowerCase() === "member";
    const planChanged =
      previousPlanInfo.planName?.toLowerCase() !== currentPlan.name?.toLowerCase();

    if (!isMember || !planChanged) return;

    // ✅ Calculs centralisés
    const newPlanMaxProjects =
      SUBSCRIPTION_LIMITS[currentPlan.name?.toLowerCase()] || 0;
    const totalProjectsOld = previousPlanInfo.totalProjects || 0;

    const maskedCount = pageData.filter((p) => p.mask).length;
    const visibleCount = totalProjectsOld - maskedCount;

    console.log("🔍 Nombre de projets masqués :", maskedCount);
    console.log("🔍 Nombre de projets visibles :", visibleCount);

    // ✅ Cas 1 : trop de projets visibles → il faut masquer
    if (visibleCount > newPlanMaxProjects) {
      const toMask = visibleCount - newPlanMaxProjects;
      setTotalProjectsToMask(toMask);
      setOpenChooseProjectToMaskModal(true);
      console.info(
        `⚠️ Trop de projets visibles (${visibleCount}), limite = ${newPlanMaxProjects}. L’utilisateur doit masquer ${toMask} projets.`
      );
      return;
    }

    // ✅ Cas 2 : pas assez de projets visibles → il peut démasquer
    if (visibleCount < newPlanMaxProjects) {
      const toUnmask = newPlanMaxProjects - visibleCount;
      setTotalProjectsToUnmask(toUnmask);
      setOpenChooseProjectToMaskModal(true);
      console.info(
        `ℹ️ Seulement ${visibleCount} projets visibles, limite = ${newPlanMaxProjects}. L’utilisateur peut démasquer ${toUnmask} projets.`
      );
      return;
    }

    // ✅ Cas 3 : équilibre parfait
    console.info("✅ Nombre de projets déjà conforme au nouveau plan.");
    setOpenChooseProjectToMaskModal(false);

  }, [subscriptionData, pageData]);


  return (
    <>
      <HelmetWrapper
        title={t("helmet.projects.title")}
        description={t("helmet.projects.description")}
        keywords={t("helmet.projects.keywords")}
        canonical={`${process.env.REACT_APP_URL}/Projects`}
      />
      <section className="bg-white-A700 flex flex-col gap-8 h-full min-h-screen overflow-auto items-start justify-start pb-14 pt-8 rounded-tl-[40px] w-full">
        <div className="flex items-start justify-start sm:px-5 px-8 w-full">
          <div className="border-b border-gray-201 border-solid flex flex-row gap-5 items-start justify-start pb-6 w-full">
            <div className="flex flex-1 font-DmSans h-full items-start justify-start w-auto">
              <PageHeader>{t("sidebar.projects")}</PageHeader>
            </div>
            <SearchInput className={"w-[240px]"} />
          </div>
        </div>
        <div className="flex flex-col items-start justify-start w-full">
          <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
            <div className="w-full bg-white-A700 border border-gray-201 rounded-[8px] shadow-tablesbs ">
              <div className="flex flex-row flex-wrap  items-center border-b border-gray-201 rounded-t-lg bg-white-A700  py-[19.5px] px-5">
                <TableTitle>{t("projects.projectList")}</TableTitle>
                <button
                  className="bg-blue-A400 disabled:pointer-events-none disabled:bg-[#E5E5E6] disabled:text-[#A7A6A8] hover:bg-[#235DBD] active:bg-[#224a94] focus:bg-[#224a94] text-white-A700 flex flex-row items-center justify-center gap-2 ml-auto px-[12px] py-[7px] h-[37px] cursorpointer rounded-md min-w-[133px] text-sm font-medium leading-[18.23px]"
                  disabled={isCreateProjectDisabled()}
                  onClick={() => handleCreateProjectBtnClick()}
                >
                  <FaRegPlusSquare size={18} className="" />
                  <span style={{ whiteSpace: "nowrap" }}>
                    {t("projects.newProject")}
                  </span>
                </button>
              </div>
              <div
                className={`bg-white-A700 flex flex-col md:gap-5 flex-1 items-start justify-start ${pageData?.length > 0
                  ? "border-b border-gray-201"
                  : "rounded-b-[8px]"
                  } w-full pb-5 min-h-[330px] overflow-x-auto`}
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                <table className=" w-full">
                  <thead>
                    <tr className="bg-white-A700 text-sm leading-[26px] font-DmSans font-medium h-[44px] ">
                      <th
                        scope="col"
                        className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium"
                      >
                        {t("projects.projectName")}
                      </th>
                      <th
                        scope="col"
                        className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium"
                      >
                        {t("projects.target")}
                      </th>
                      <th
                        scope="col"
                        className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium"
                      >
                        {t("projects.raised")}
                      </th>
                      <th
                        scope="col"
                        className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium"
                      >
                        {t("projects.stage")}
                      </th>
                      <th
                        scope="col"
                        className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium"
                      >
                        {t("projects.milestone")}
                      </th>
                      <th
                        scope="col"
                        className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium"
                      >
                        {t("projects.status")}
                      </th>
                      <th scope="col" className="px-[18px] py-3 ">
                        {``}
                      </th>
                    </tr>
                  </thead>
                  {pageData?.length > 0 ? (
                    <tbody className="items-center w-full ">
                      {pageData.map(
                        (item, index) => {

                          return (
                            <tr
                              key={index}
                              className={`${index % 2 === 0 ? "bg-gray-50" : ""}
                               ${!item?.mask
                                  ? "hover:bg-blue-50 cursorpointer transition-all duration-300 ease-in-out"
                                  : "opacity-40 line-through pointer-events-none"
                                }`}
                              onClick={() =>
                                navigate(`/Projectdetails/${item._id}`, {
                                  state: { project: item },
                                })
                              }
                            >
                              <td className="px-[18px] py-4 text-blue_gray-601 font-dm-sans-regular text-sm leading-6 capitalize">
                                {item?.name}
                              </td>
                              <td className="px-[18px] py-4 text-blue_gray-601 font-dm-sans-regular text-sm leading-6">{`${item.currency
                                } ${item?.funding
                                  ?.toLocaleString("fr-FR")
                                  .replace(/\s/g, "\u00A0")}`}</td>
                              <td className="px-[18px] py-4 text-blue_gray-601 font-dm-sans-regular text-sm leading-6">{`${item.currency
                                } ${(item?.totalRaised || 0)
                                  ?.toLocaleString("fr-FR")
                                  .replace(/\s/g, "\u00A0")}`}</td>
                              <td className="px-[18px] py-4 text-blue_gray-601 font-dm-sans-regular text-sm leading-6 capitalize">
                                {t(item?.stage) || "-"}
                              </td>
                              <td className="px-[18px] py-4 text-blue_gray-601 font-dm-sans-regular text-sm leading-6 capitalize">
                                {item?.milestones[0]?.name || "-"}
                              </td>
                              <td className="px-[18px] py-4 items-center">
                                <StatusBadge status={item?.status} />
                              </td>
                              <td className="py-4 px-4 ">
                                <div className="flex flex-row space-x-4 items-center">
                                  <div
                                    className={`relative group ${item?.mask ? "z-100" : ""
                                      }`}
                                  >
                                    <HiOutlineTrash
                                      size={17}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        openDeleteModal(item);
                                      }}
                                      className="text-blue_gray-301"
                                    />
                                    <div className="absolute top-[100%] right-0 transform hidden group-hover:flex flex-col items-end z-10">
                                      <div className="mb-px mr-[3px]">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="13"
                                          height="7"
                                          viewBox="0 0 13 7"
                                          fill="none"
                                        >
                                          <path
                                            d="M0.8547 5.26895L5.81768 0.63683C6.20189 0.278237 6.79811 0.278237 7.18232 0.636829L12.1453 5.26894C12.8088 5.88823 12.3706 7 11.463 7H1.53702C0.629399 7 0.191179 5.88823 0.8547 5.26895Z"
                                            fill="#2C3563"
                                          />
                                        </svg>
                                      </div>
                                      <div className="bg-[#334081] min-w-[92px] h-[30px] rounded-[6px] px-[18px] py-[3px] flex items-center">
                                        <div className="grow shrink basis-0 text-center text-white-A700 text-sm font-dm-sans-regular leading-relaxed">
                                          {t("common.delete")}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="relative group">
                                    <FiEdit3
                                      size={17}
                                      className="text-blue_gray-301 cursorpointer"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(`/EditProject/${item._id}`, {
                                          state: { project: item },
                                        });
                                      }}
                                    />
                                    <div className="absolute top-[100%] right-0 transform hidden group-hover:flex flex-col items-end z-10">
                                      <div className="mb-px mr-[3px]">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="13"
                                          height="7"
                                          viewBox="0 0 13 7"
                                          fill="none"
                                        >
                                          <path
                                            d="M0.8547 5.26895L5.81768 0.63683C6.20189 0.278237 6.79811 0.278237 7.18232 0.636829L12.1453 5.26894C12.8088 5.88823 12.3706 7 11.463 7H1.53702C0.629399 7 0.191179 5.88823 0.8547 5.26895Z"
                                            fill="#2C3563"
                                          />
                                        </svg>
                                      </div>
                                      <div className="bg-[#334081] min-w-[92px] h-[30px] rounded-[6px] px-[18px] py-[3px] flex items-center">
                                        <div className="grow shrink basis-0 text-center text-white-A700 text-sm font-dm-sans-regular leading-relaxed">
                                          {t("common.edit")}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          );
                        }
                      )}
                    </tbody>
                  ) : null}
                </table>
                {isLoading ? (
                  <div className="flex flex-col items-center text-blue_gray-800_01 gap-[16px] min-h-[330px] w-full py-28 rounded-b-[8px]">
                    <Loader />
                  </div>
                ) : (
                  !pageData?.length > 0 && (
                    <div className="flex flex-col items-center text-blue_gray-800_01 gap-[16px] min-h-[330px] w-full py-28 rounded-b-[8px]">
                      <img src={fileSearchImg} alt={""} />
                      <p className="font-dm-sans-medium text-sm leading-6 text-gray700 w-auto">
                        {t("projects.noProject")}
                      </p>
                    </div>
                  )
                )}
              </div>
              {pageData?.length > 0 && (
                <div className="w-full flex items-center p-4">
                  <TablePagination
                    currentPage={cur}
                    totalPages={totalPages}
                    // onPageChange={handlePageChange}
                    itemsToShow={itemsToShow}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onRequestClose={closeDeleteModal}
          title={t("projects.deleteProjectConfirmation.title")}
          onDelete={handleDelete}
          content={
            <p className="font-dm-sans-regular text-[#1D1C21] text-center text-base leading-6">
              {t("projects.deleteProjectConfirmation.confirmationMessage")}
            </p>
          }
        />
        <EmailExistModalOrConfirmation
          isOpen={deleteSuccesModal}
          onRequestClose={clodeDeleteSuccessModal}
          content={
            <div className="flex flex-col gap-[38px] items-center justify-start w-full">
              <img
                className="h-[100px] w-[100px]"
                src={checkVerified}
                alt="successtick"
              />
              <div className="flex flex-col gap-5 items-center justify-start w-full">
                <p className="leading-[26.00px] font-dm-sans-medium text-[18px] text-[#1d2838] text-center ">
                  {t("projects.deleteProjectConfirmation.successMessage")}
                </p>
              </div>
            </div>
          }
        />
      </section>
      <CommonModal
        isOpen={openCreditsModal}
        onRequestClose={() => setOpenCreditsModal(false)}
        title={t("Confirmation")}
        content={
          <div className="flex flex-col gap-5 items-center justify-start py-5 w-full">
            <div className="self-stretch text-center text-[#1d1c21] text-base font-dm-sans-regular leading-relaxed">
              {t("This action will result in a charge of")}{" "}
              <span className="text-[#2575f0]">
                {t("creditsCost", {
                  credits: PRICING_COST_CONFIG.ADD_PROJECT_COST,
                })}
              </span>{" "}
              <br />
              <span className="pt-2">{t("Are you ready to proceed?")}</span>
            </div>
            <div className="self-stretch justify-center items-center pt-4 gap-[18px] inline-flex">
              <button
                className="px-5 h-11 py-[12px] bg-[#e4e6eb] rounded-md justify-center items-center gap-[18px] flex cursorpointer hover:bg-[#D0D5DD] active:bg-light_blue-100"
                onClick={() => setOpenCreditsModal(false)}
              >
                <div className="text-[#475466] text-base font-dm-sans-medium">
                  {t("common.cancel")}
                </div>
              </button>
              <button
                className="h-11 min-w-[195px] px-5 py-[12px] bg-[#2575f0] rounded-md justify-center items-center gap-[18px] flex cursorpointer hover:bg-[#235DBD] active:bg-[#224a94]"
                onClick={() => handreReduceCreditsForAddProject()}
              >
                <div className="text-white-A700 text-base font-dm-sans-medium">
                  {confirmCreditsSending ? (
                    <div className="flex items-center justify-center gap-6">
                      {" "}
                      {t("all.sending")}
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.4995 13.5002L20.9995 3.00017M10.6271 13.8282L13.2552 20.5862C13.4867 21.1816 13.6025 21.4793 13.7693 21.5662C13.9139 21.6415 14.0862 21.6416 14.2308 21.5664C14.3977 21.4797 14.5139 21.1822 14.7461 20.5871L21.3364 3.69937C21.5461 3.16219 21.6509 2.8936 21.5935 2.72197C21.5437 2.57292 21.4268 2.45596 21.2777 2.40616C21.1061 2.34883 20.8375 2.45364 20.3003 2.66327L3.41258 9.25361C2.8175 9.48584 2.51997 9.60195 2.43326 9.76886C2.35809 9.91354 2.35819 10.0858 2.43353 10.2304C2.52043 10.3972 2.81811 10.513 3.41345 10.7445L10.1715 13.3726C10.2923 13.4196 10.3527 13.4431 10.4036 13.4794C10.4487 13.5115 10.4881 13.551 10.5203 13.5961C10.5566 13.647 10.5801 13.7074 10.6271 13.8282Z"
                          stroke="white"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  ) : (
                    t("Confirm")
                  )}
                </div>
              </button>
            </div>
          </div>
        }
      />
      <CommonModal
        isOpen={openCreateProjectProgressModal}
        onRequestClose={() => setOpenCreateProjectProgressModal(false)}
        title={t("Action Required: Create Project")}
        content={
          <div className="flex flex-col gap-5 items-center justify-start py-5 w-full">
            <div className="self-stretch flex flex-col text-center text-[#1d1c21] text-base font-dm-sans-regular leading-relaxed">
              {t(
                "You already have a draft project that needs to be completed."
              )}
              <span className="pt-2">
                {t("Would you like to validate it?")}
              </span>
            </div>
            <div className="self-stretch justify-center items-center pt-4 gap-[18px] inline-flex">
              <button
                className="px-5 h-11 py-[12px] bg-[#e4e6eb] rounded-md justify-center items-center gap-[18px] flex cursorpointer hover:bg-[#D0D5DD] active:bg-light_blue-100"
                onClick={() => setOpenCreateProjectProgressModal(false)}
              >
                <div className="text-[#475466] text-base font-dm-sans-medium">
                  {t("Continue Navigation")}
                </div>
              </button>
              <button
                className="h-11 px-5 py-[12px] bg-[#2575f0] rounded-md justify-center items-center gap-[18px] flex cursorpointer hover:bg-[#235DBD] active:bg-[#224a94]"
                onClick={() => navigate(`/CreateProject`)}
              >
                <div className="text-white-A700 text-base font-dm-sans-medium">
                  {t("Go to create project")}
                </div>
              </button>
            </div>
          </div>
        }
      />
      <EmailExistModalOrConfirmation
        isOpen={openErrorModal}
        onRequestClose={() => {
          setOpenErrorModal(false);
          setDeductionCreditsError("");
        }}
        content={
          <div className="flex flex-col gap-[38px] items-center justify-start  w-full">
            <img
              className="h-[80px] w-[80px]"
              src={email_error}
              alt="successtick"
            />
            <div className="flex flex-col gap-5 items-center justify-start w-full">
              <h1 className="text-[#1d2838] w-[460px] text-lg leading-relaxed font-dm-sans-medium text-center ">
                {t("Processing Error")}
              </h1>
              <p className="leading-relaxed w-[460px] font-dm-sans-regular text-[#1d2838] text-center text-sm">
                {t(
                  "An error occurred while deducting credits. Please check your subscription and available credits, then try again."
                )}
              </p>
            </div>
          </div>
        }
      />
      <ProjectsToMaskModal isOpen={openChooseProjectToMaskModal} totalProjectsToMask={totalProjectsToMask} totalProjectsToUnmask={totalProjectsToUnmask} />
    </>
  );
};

export default Projects;
