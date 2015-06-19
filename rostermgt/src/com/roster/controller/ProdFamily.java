package com.roster.controller;

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
import com.workgroup.model.workGroupController;

/**
 * Servlet implementation class ProdFamily
 */
@WebServlet("/ProdFamily")
public class ProdFamily extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public ProdFamily() {
		super();
		// TODO Auto-generated constructor stub
	}

	// requeste from an ajax request
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		java.sql.Connection conn = null;
		PreparedStatement st = null;
		ResultSet data = null;
		String sql;
		try {
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

			String signature = (jsonObj.getString("signature") == null) ? ""
					: jsonObj.getString("signature");
			String prodFamName = (jsonObj.getString("prodFamName") == null) ? ""
					: jsonObj.getString("prodFamName");
			String prodFamId = (jsonObj.getString("prodFamId") == null) ? ""
					: jsonObj.getString("prodFamId");
			String prodFamDesc = (jsonObj.getString("prodFamDesc") == null) ? ""
					: jsonObj.getString("prodFamDesc");
			String langCenterId = (jsonObj.getString("langCenterId") == null) ? ""
					: jsonObj.getString("langCenterId");
			String langCenterName = (jsonObj.getString("langCenterName") == null) ? ""
					: jsonObj.getString("langCenterName");
			String langCenterDesc = (jsonObj.getString("langCenterDesc") == null) ? ""
					: jsonObj.getString("langCenterDesc");
			String wgName = (jsonObj.getString("wgName") == null) ? ""
					: jsonObj.getString("wgName");
			String wgId = (jsonObj.getString("wgId") == null) ? "" : jsonObj
					.getString("wgId");
			String wgTargetHC = (jsonObj.getString("wgTargetHC") == null) ? ""
					: jsonObj.getString("wgTargetHC");
			String wgWfHC = (jsonObj.getString("wgWfHC") == null) ? ""
					: jsonObj.getString("wgWfHC");
			String wgPSM = (jsonObj.getString("wgPSM") == null) ? "" : jsonObj
					.getString("wgPSM");

			switch (signature) {
			case "getprodfamlist":
				sql = workGroupController.GetProdFamList();
				break;
			case "getallcenters":
				sql = workGroupController.GetLanguageCenterList();
				break;
			case "IsnertEmployee":
				sql = "";
				break;
			case "getalltms":
				sql = workGroupController.GetTmList();
				break;
			case "addtmwg":
				sql = workGroupController.AddWgTmInfo(wgId, wgName,
						langCenterId);
				break; //
			case "getpsmlist":
				sql = workGroupController.GetPSMList();
				break;
			case "addwginfo":
				sql = workGroupController.AddWorkGroupInfo(wgName, wgPSM,
						wgTargetHC, langCenterName, prodFamName, wgWfHC);
				break;
			case "getallwgpertm":
				sql = workGroupController.GetAllworkgroupByTM(wgId);// deletewg
				break;
			case "deletewg":
				sql = workGroupController.DeleteWg(wgId, wgName);
				break;
			case "getwgtm":
				sql = workGroupController.GetWgManagers(wgName);
				break;
			case "getloclist":
				sql = workGroupController.GetLocationList();
				break;
			case "addmultitmwg":
				sql = workGroupController.AddUpdateWgTmInfo(wgId, wgName,
						langCenterId, prodFamDesc, prodFamId);
				break;
			case "addmultiwgtm":
				sql = workGroupController.AddUpdatetmwginfo(wgId, wgName,
						langCenterId, prodFamDesc, prodFamId);  
				break;
			case "deassoctmwg":
				sql = workGroupController.DeAssociateTMWG(wgName);
				break;
			case "getallhistoricalwgtm":
				sql = workGroupController.GetHistoricalWgTM(wgName);
				break;
			case "addtoresignedemployees":
				sql = workGroupController.AddToResignedList(wgId, prodFamName,
						langCenterName, wgWfHC);
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
