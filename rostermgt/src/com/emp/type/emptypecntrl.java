package com.emp.type;

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

import com.roster.admin.ResultSetConverter;
import com.roster.controller.EmployeeSignatures;
import com.workgroup.model.workGroupController;

/**
 * Servlet implementation class emptypecntrl
 */
@WebServlet("/emptypecntrl")
public class emptypecntrl extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public emptypecntrl() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		java.sql.Connection conn = null;
		PreparedStatement st = null;
		ResultSet data = null;
		try {

			// javax.naming.InitialContext ctx = null;
			String is = request.getParameterMap().toString();
			String paraNames[] = is.split("=");
			String jsonParameters = (paraNames[0] + "}").replace("{{", "{")
					.replace("}}", "}");

			JSONObject jsonObj = new JSONObject(jsonParameters);
			try {
				conn = DriverManager.getConnection(
						"jdbc:postgresql://10.91.22.235:5432/reporting",
						"postgres", "P0stgres");
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			String sql;
			String signature = (jsonObj.optString("signature", ""));
			String emp_type = (jsonObj.optString("emp_type", ""));
			String replaced_employee = (jsonObj.optString("replaced_employee",
					""));
			String start_date = (jsonObj.optString("start_date", ""));
			String end_date = (jsonObj.optString("end_date", ""));
			String taleo_no = (jsonObj.optString("taleo_no", ""));
			String description = (jsonObj.optString("description", ""));
			String is_replaced = (jsonObj.optString("is_replaced", ""));
			String wgname = (jsonObj.optString("wgname", ""));
			String tm_id = (jsonObj.optString("tm_id", ""));
			String emp_id = (jsonObj.optString("emp_id", ""));
			String emp_name = (jsonObj.optString("emp_name", ""));
			String email = (jsonObj.optString("email", ""));
			String leave_type = (jsonObj.optString("leave_type", ""));
			String interimVal = (jsonObj.optString("interimVal", ""));
			String historicalId = jsonObj.optString("historicalId", "");

			String psmId = (jsonObj.optString("psm_id", ""));
			String psmName = jsonObj.optString("psm_name", "");

			String currentStatVal = jsonObj.optString("currstat", "");

			switch (signature) {
			case "addLeave":
				sql = EmployeeSignatures.AddLeaveEmployee(emp_id, leave_type,
						"1", start_date, end_date);
				break;
			case "updateinterrimstatus":
				sql = EmployeeSignatures.UpdateEmployeeInterimStatus(emp_id,
						interimVal);
				break;
			case "insertinterim":
				sql = EmployeeSignatures.InsertInterimTM(emp_id);
				break;
			case "historicalinterim":
				sql = EmployeeSignatures.MakeInterimHistorical(emp_id);
				break;
			case "addContractual":
				sql = EmployeeSignatures.AddContractualEmployee(emp_id,
						emp_name, email, start_date, end_date, tm_id,
						description, wgname);
				break;
			case "detelethistoricaldata":
				sql = EmployeeSignatures.DeleteHistoricalData(historicalId);
				break;
			case "updatehistoricalinfo":
				sql = EmployeeSignatures.UpdateHistoricalData(historicalId,
						start_date, end_date);
				break;
			case "addResigned":
				sql = "";
				break;
			case "addPormoted":
				sql = workGroupController.GetTmList();
				break;
			case "getcurrentempstat":
				sql = EmployeeSignatures.GetCurrentStatus(currentStatVal,
						emp_id);
				break;
			case "updatecurrentemptminfo":
				sql = EmployeeSignatures.UpdateCurrentEmpTmInfo(emp_id, tm_id,
						start_date, end_date);
				break;
			case "updatecurrentempwginfo":
				sql = EmployeeSignatures.UpdateCurrentEmpWgInfo(emp_id, wgname,
						start_date, end_date);
				break;
			case "getpsmempmapping":
				sql = EmployeeSignatures.GetEmpPsmMapping(emp_id);
				break;
			case "updateemppsmmapping":
				sql = EmployeeSignatures.UpdateEmpPsmMapping(emp_id, psmId,
						psmName, email);
				break;
			case "updatewghistoricalinfo":
				sql = EmployeeSignatures.UpdateWgHistoricalData(historicalId,
						start_date, end_date);
				break;
			case "deteletwghistoricaldata":
				sql = EmployeeSignatures.DeleteWgHistoricalData(historicalId);
				break;
			default:
				sql = "default";
				break;
			}

			st = conn.prepareCall(sql);
			data = st.executeQuery();

			response.setContentType("application/json");
			response.setCharacterEncoding("utf-8");
			response.getWriter().write(
					ResultSetConverter.convert(data).toString());

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
			response.getWriter().write((e).toString() + "badtrip naman oh");
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
				st.close();
			} catch (Exception e) { /* ignored */
			}
			try {
				data.close();
			} catch (Exception e) { /* ignored */
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
