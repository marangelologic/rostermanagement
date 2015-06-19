package com.qa.controller;

import java.io.IOException;
import java.sql.CallableStatement;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONException;
import org.json.JSONObject;

import com.qa.model.QaModel;
import com.roster.admin.ResultSetConverter;

/**
 * Servlet implementation class QaController
 */
@WebServlet("/qctrl")
public class QaController extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public QaController() {
		super();
		// TODO Auto-generated constructor stub
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
			String year = jsonObj.optString("qm_year", "");
			String tag_date = jsonObj.optString("tagDate", "");
			String wgName = jsonObj.optString("wgName", "");
			String reqOrder = jsonObj.optString("reqOrder", "");

			String evalId = jsonObj.optString("evalId", "");
			String evalName = jsonObj.optString("evalName", "");
			
			try {
				conn = DriverManager.getConnection(
						"jdbc:postgresql://10.91.22.235:5432/reporting",
						"postgres", "P0stgres");
			} catch (SQLException e) {
				e.getMessage();

			}

			switch (method) {
			case "adddefaultqaScore":
				sqlUpdate = QaModel.AddQATargetSCore(tmName, tmId, empName,
						empId, reqType, reqSubType, sDate, eDate, quarter,
						imp360Status, reportingStatus, reqStatus, reasonTm,
						prevScore, currScore, reqDate, isCurrentRecord,
						reqWeekNo, approvalWeekNo, year, wgName, reqOrder, evalId,evalName);
				break;
			case "adddefaultqaScorevalidated":
				sqlUpdate = QaModel.AddQATargetSCoreValidated(tmName, tmId, empName,
						empId, reqType, reqSubType, sDate, eDate, quarter,
						imp360Status, reportingStatus, reqStatus, reasonTm,
						prevScore, currScore, reqDate, isCurrentRecord,
						reqWeekNo, approvalWeekNo, year, wgName, reqOrder, evalId,evalName);
				break;	
			case "tagaspermanent":
				sqlUpdate = QaModel.TagAsPermanent(empId);
				break;
			case "getqastatus":
				sqlUpdate = QaModel.GetPermanentStatus(empId);
				break;
			case "getevaluationlist":
				sqlUpdate = QaModel.GetEvaluatorList();
				break;
			}

			try {
				st = conn.prepareCall(sqlUpdate,Statement.RETURN_GENERATED_KEYS,0);
				data = st.getGeneratedKeys();
				String var = "";
				while(data.next()){
					var = data.getString(0);
				}
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
			response.getWriter().write(("[{\"success\":\"success\"}]"));

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
					conn.close();
				} catch (Exception e) {
					// TODO: handle exception
				}
			}
		}

	}
}
