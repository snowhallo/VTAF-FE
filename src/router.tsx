import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import DashboardLayout from "@/layouts/DashboardLayout";

// Loading component for Suspense fallback
const LoadingFallback = () => (
  <div className="min-h-[50vh] flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#006B3F]"></div>
  </div>
);

// Lazy load pages
const HomePage = lazy(() => import("@/pages/home"));
const ProjectDetailPage = lazy(() => import("@/pages/projects/detail"));
const CampaignDetailPage = lazy(() => import("@/pages/campaigns/detail"));
const AuthPage = lazy(() => import("@/pages/auth"));

// Dashboard Pages
const DashboardIndexPage = lazy(() => import("@/pages/dashboard"));
const DonorDashboardPage = lazy(() => import("@/pages/dashboard/donor"));
const DonorHistoryPage = lazy(() => import("@/pages/dashboard/donor/history"));
const SchoolDashboardPage = lazy(() => import("@/pages/dashboard/school"));
const SchoolProfilePage = lazy(() => import("@/pages/dashboard/school/profile"));
const SchoolProjectsPage = lazy(() => import("@/pages/dashboard/school/projects"));
const CreateSchoolProjectPage = lazy(() => import("@/pages/dashboard/school/projects/new"));
const SchoolProjectDetailPage = lazy(() => import("@/pages/dashboard/school/projects/detail"));
const ReviewerOverviewPage = lazy(() => import("@/pages/dashboard/reviewer"));
const ReviewerProjectsPage = lazy(() => import("@/pages/dashboard/reviewer/projects"));
const ReviewerSubmissionsPage = lazy(() => import("@/pages/dashboard/reviewer/submissions"));
const ReviewerSubmissionDetailPage = lazy(() => import("@/pages/dashboard/reviewer/submissions/detail"));
const AdminDashboardPage = lazy(() => import("@/pages/dashboard/admin"));
const AccountantDashboardPage = lazy(() => import("@/pages/dashboard/accountant"));
const SettingsPage = lazy(() => import("@/pages/dashboard/settings"));

const NotFoundPage = lazy(() => import("@/pages/errors/NotFound"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: "projects/:id",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <ProjectDetailPage />
          </Suspense>
        ),
      },
      {
        path: "campaigns/:id",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <CampaignDetailPage />
          </Suspense>
        ),
      },
      {
        path: "auth",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <AuthPage />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <NotFoundPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <DashboardIndexPage />
          </Suspense>
        ),
      },
      {
        path: "donor",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <DonorDashboardPage />
          </Suspense>
        ),
      },
      {
        path: "donor/history",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <DonorHistoryPage />
          </Suspense>
        ),
      },
      {
        path: "school",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <SchoolDashboardPage />
          </Suspense>
        ),
      },
      {
        path: "school/profile",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <SchoolProfilePage />
          </Suspense>
        ),
      },
      {
        path: "school/projects",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <SchoolProjectsPage />
          </Suspense>
        ),
      },
      {
        path: "school/projects/new",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <CreateSchoolProjectPage />
          </Suspense>
        ),
      },
      {
        path: "school/projects/:id",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <SchoolProjectDetailPage />
          </Suspense>
        ),
      },
      {
        path: "reviewer",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <ReviewerOverviewPage />
          </Suspense>
        ),
      },
      {
        path: "reviewer/projects",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <ReviewerProjectsPage />
          </Suspense>
        ),
      },
      {
        path: "reviewer/submissions",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <ReviewerSubmissionsPage />
          </Suspense>
        ),
      },
      {
        path: "reviewer/submissions/:id",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <ReviewerSubmissionDetailPage />
          </Suspense>
        ),
      },
      {
        path: "admin",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <AdminDashboardPage />
          </Suspense>
        ),
      },
      {
        path: "accountant",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <AccountantDashboardPage />
          </Suspense>
        ),
      },
      {
        path: "settings",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <SettingsPage />
          </Suspense>
        ),
      },
    ],
  },
]);
