import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useCheckSubscriptionStatusQuery } from '../Services/Subscription.Service';
import { useGetAllProjectsWithoutPageQuery } from '../Services/Member.Service';
import { useGetTheDraftProjectQuery } from '../Services/Project.Service';
import { SUBSCRIPTION_LIMITS as limits } from '../data/data';

const ProtectCreateProjectRoute = () => {
  const { data: subscriptions } = useCheckSubscriptionStatusQuery();
  const { data: projects } = useGetAllProjectsWithoutPageQuery();
  const { data: draftProject } = useGetTheDraftProjectQuery();

  const planName = subscriptions?.plan?.name?.toLowerCase() || 'basic';
  const nbProjects = projects?.length || 0;
  const hasDraft = !!draftProject;

  const maxAllowed = limits[planName] ?? 1;

  const isBelowLimit = nbProjects < maxAllowed;

  // 🎯 Condition d'accès
  const isAllowed = isBelowLimit && hasDraft;

  console.log('ProtectCreateProjectRoute:', { planName, nbProjects, maxAllowed, hasDraft, isAllowed });

  return isAllowed ? <Outlet /> : <Navigate to="/Projects" />;
};

export default ProtectCreateProjectRoute;
