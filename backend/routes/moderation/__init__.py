from fastapi import APIRouter
from .ban import ban
from .unban import unban
from .report_article import report_article
from .get_pending_reports import get_pending_reports
from .delete_article import delete_article
from backend.schematics.user import UserOutData
from backend.schematics.report import ReportOutData

router = APIRouter(tags=["moderation"])

router.add_api_route(
    "/ban",
    ban,
    methods=["PUT"],
    response_model=UserOutData
)

router.add_api_route(
    "/unban",
    unban,
    methods=["PUT"],
    response_model=UserOutData
)

router.add_api_route(
    "/report-article",
    report_article,
    methods=["POST"],
    response_model=ReportOutData
)

router.add_api_route(
   "/get-pending-reports",
    get_pending_reports,
    methods=["GET"],
    response_model=list[ReportOutData]
)

router.add_api_route(
    "/delete-article",
    delete_article,
    methods=["DELETE"]
)