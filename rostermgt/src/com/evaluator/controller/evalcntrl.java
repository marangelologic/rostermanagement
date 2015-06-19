package com.evaluator.controller;

import java.io.IOException;
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
import com.evaluator.model.EvalModel;
import com.roster.admin.ResultSetConverter;

@WebServlet("/evalcntrl")
public class evalcntrl extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public evalcntrl() {
		super();

	}

	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		java.sql.Connection conn = null;
		PreparedStatement st = null;
		ResultSet data = null;
		String sql;
		try {

			javax.naming.InitialContext ctx = null;
			String is = request.getParameterMap().toString();
			String paraNames[] = is.split("=");
			String jsonParameters = (paraNames[0] + "}").replace("{{", "{")
					.replace("}}", "}");

			JSONObject jsonObj = new JSONObject(jsonParameters);
			try {

				// java.sql.Driver d = new com.po
				conn = DriverManager.getConnection(
						"jdbc:postgresql://10.91.22.235:5432/reporting",
						"postgres", "P0stgres");
				// st = conn.createStatement();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

			/*
			 * javax.sql.DataSource ds = (javax.sql.DataSource) ctx
			 * .lookup("mylocalconnection2"); conn = ds.getConnection();
			 */

			String signature = (jsonObj.getString("signature") == null) ? ""
					: jsonObj.getString("signature");

			String evalId = jsonObj.optString("evalId", "");
			String evalName = jsonObj.optString("evalName", "");
			String evalEmail = jsonObj.optString("evalEmail", "");
			String target = jsonObj.optString("target", "");
			String evalSerialId = jsonObj.optString("evalSerialId", "");
			String employeeId = jsonObj.optString("employeeId", "");

			switch (signature) {
			case "getallevaluators":
				sql = EvalModel.GetAllEvaluators();
				break;
			case "getevaluatorInfo":
				sql = EvalModel.GetEvalInfo(evalId);
				break;
			case "updateevalinfo":
				sql = EvalModel.UpdateEvaluator(evalId, evalName, evalEmail);
				break;
			case "deactivateval":
				sql = EvalModel.DeactivateEval(evalId);
				break;
			case "addeval":
				sql = EvalModel.AddEvaluator(evalId, evalName, evalEmail);
				break;
			case "getlatestId":
				sql = EvalModel.GetLastInsertedId();
				break;
			case "addevaluatortarget":
				sql = EvalModel.AddEvaluation(evalSerialId, target, evalId,employeeId);
				break;
			default:
				sql = "default";
				break;
			}

			st = conn.prepareCall(sql);
			data = st.executeQuery();

			response.setContentType("application/json");
			response.setCharacterEncoding("utf-8");
			if (data.equals("") || data.equals(null)) {
				response.getWriter().write(
						("\"success\":\"success\"").toString());
			} else {
				response.getWriter().write(
						ResultSetConverter.convert(data).toString());
			}
			try {
				st.close();
				data.close();
			} catch (SQLException logOrIgnore) {

			}
			try {
				conn.close();

			} catch (SQLException logOrIgnore) {

			}

		} catch (SQLException e) {

			response.setContentType("application/json");
			response.setCharacterEncoding("utf-8");
			if (e.toString()
					.equalsIgnoreCase(
							"org.postgresql.util.PSQLException: No results were returned by the query.")) {
				response.getWriter().write("{\"success\":\"success\"}");
			} else {
				response.getWriter().write((e).toString() + "badtrip naman oh");
			}
		} catch (JSONException f) {
			response.setContentType("application/json");
			response.setCharacterEncoding("utf-8");
			response.getWriter().write((f).toString());
		} catch (NullPointerException g) {

			response.setContentType("application/json");
			response.setCharacterEncoding("utf-8");
			response.getWriter().write((g).toString());
			
		} finally {
			try {
				if (st != null) {
					st.close();
				}
			} catch (Exception e) {
				e.getMessage();
			}
			try {
				if (data != null) {
					data.close();
				}
			} catch (Exception e) {
				e.getMessage();
			}
			if (conn != null) {
				try {
					conn.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
		}
	}
}
