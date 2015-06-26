package com.tm.qa.controller;

import java.io.IOException;
import java.sql.CallableStatement;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONException;
import org.json.JSONObject;

import com.admin.model.AdminModel;
import com.conn.util.ConnectionUtil;
import com.qa.model.QaModel;
import com.qa.model.TmQaModel;
import com.roster.admin.ResultSetConverter;

@WebServlet("/QaTmCtrl")
public class QaTmCtrl extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public QaTmCtrl() {
		super();
	}

	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		String sqlUpdate = null;

		CallableStatement st = null;
		java.sql.Connection conn = null;
		ResultSet data = null;
		try {

			String is = request.getParameterMap().toString();
			String paraNames[] = is.split("=");
			String jsonParameters = (paraNames[0] + "}").replace("{{", "{")
					.replace("}}", "}");

			JSONObject jsonObj = new JSONObject(jsonParameters);

			String method = jsonObj.optString("signature", "");
			String empId = jsonObj.optString("empId", "");
			String tmName = jsonObj.optString("tmName", "");
			String tmId = jsonObj.optString("tmId", "");
			String empName = jsonObj.optString("empName", "");
			String reqType = jsonObj.optString("reqType", "");
			String reqSubType = jsonObj.optString("reqSubType", "");
			String sDate = jsonObj.optString("sDate", "");
			String eDate = jsonObj.optString("eDate", "");
			String quarter = jsonObj.optString("quarter", "");
			String imp360Status = jsonObj.optString("imp360Status", "");
			String reportingStatus = jsonObj.optString("reportingStatus", "");
			String reqStatus = jsonObj.optString("reqStatus", "");
			String reasonTm = jsonObj.optString("reasonTm", "");
			String prevScore = jsonObj.optString("prevScore", "");
			String currScore = jsonObj.optString("currScore", "");
			String reqDate = jsonObj.optString("reqDate", "");
			String isCurrentRecord = jsonObj.optString("isCurrentRecord", "");
			String reqWeekNo = jsonObj.optString("reqWeekNo", "");
			String approvalWeekNo = jsonObj.optString("approvalWeekNo", "");
			String tag_date = jsonObj.optString("tagDate", "");
			String year = jsonObj.optString("qm_year", "");
			String option = jsonObj.optString("optionView", "");
			String wgName = jsonObj.optString("wgName", "");
			String reqOrder = jsonObj.optString("reqOrder", "");
			String status = jsonObj.optString("status", "");
			String serialId = jsonObj.optString("serialId", "");
			String isAll = jsonObj.optString("isAll", "");
			String type = jsonObj.optString("type", "");
			String tm_req_status = jsonObj.optString("tm_req_status", "");
			String dec_date = jsonObj.optString("dec_date", "");
			String dec_type = jsonObj.optString("dec_type", "");
			String app_week_no = jsonObj.optString("app_week_no", "");
			String reasonQm = jsonObj.optString("reasonQm", "");
			String qmreq = jsonObj.optString("qmreq","");
			String qmserialreq = jsonObj.optString("qmserialreq","");

			try {
				conn = ConnectionUtil.connectUtil();
			} catch (Exception e) {
				e.getMessage();

			}

			switch (method) {
			case "gettargets":
				sqlUpdate = TmQaModel.GetCurrentTargets(empId, tmId, quarter,
						year, reqSubType);
				break;
			case "updatetohistoricaldata":
				sqlUpdate = TmQaModel.SetTargetHistorical(empId, reqSubType,
						dec_type);
				break;
			case "getrequests":
				sqlUpdate = TmQaModel.GetCurrentRequests(tmId, quarter, option,
						year, reqOrder, status);
				break;
			case "getcomment":
				sqlUpdate = TmQaModel.GetAllSerialInformation(serialId);
				break;
			case "advancesearch":
				sqlUpdate = TmQaModel.GetAllRequests(isAll, type, quarter,
						year, status);
				break;
			case "getallnewreqs":
				sqlUpdate = TmQaModel.CountNewreqs();
				break;//
			case "updaterequest":
				sqlUpdate = TmQaModel.UpdateTmRequest(serialId, tm_req_status,
						dec_type, dec_date, app_week_no, reportingStatus,
						imp360Status, isCurrentRecord,currScore);
				break;
			case "updateqmcomment":
				sqlUpdate = TmQaModel.UpdateQmActivity(serialId, reasonQm);
				break;
			case "taggingmethod":
				sqlUpdate = TmQaModel.UpdateTmRequest(serialId,reportingStatus,imp360Status);
				break;
			case "gettmtargetevalmapping":
				sqlUpdate = TmQaModel.GetTmTargetEvaluatorMapping(qmreq);
				break;
			case "updateevaluatortarget":
				sqlUpdate = TmQaModel.UpdateEvaluatorTarget(currScore, qmserialreq);
				break;
			case "deleteevaluatortarget":
				sqlUpdate = TmQaModel.DeleteeEvaluatorTarget(qmserialreq);
				break;
			default:
				sqlUpdate = "error" + method;
				break;
			}

			try {
				st = conn.prepareCall(sqlUpdate);
				data = st.executeQuery();
				response.setContentType("application/json");
				response.setCharacterEncoding("utf-8");

			} catch (NullPointerException e) {
				response.setContentType("application/json");
				response.setCharacterEncoding("utf-8");
				response.getWriter().write(("[{\"success\":\"success\"}]"));
			}
			if (data.equals("") || data.equals(null)) {
				response.getWriter().write(("[{\"success\":\"success\"}]"));
			} else {
				response.getWriter().write(
						ResultSetConverter.convert(data).toString());
			}
		} catch (SQLException h) {
			response.setContentType("application/json");
			response.setCharacterEncoding("utf-8");
			response.getWriter().write(
					("[{\"meesage\":\"" + h.getMessage() + "\"}]"));

		} catch (JSONException f) {
			response.setContentType("application/json");
			response.setCharacterEncoding("utf-8");
			response.getWriter().write((f).toString());

		} catch (NullPointerException e) {
			response.setContentType("application/json");
			response.setCharacterEncoding("utf-8");
			response.getWriter().write(("[{\"success\":\"success\"}]"));
		} finally {
			if (conn != null) {
				try {
					st.close();
					conn.close();
					data.close();
				} catch (Exception e) {
					// TODO: handle exception
				}
			}
		}

	}

}
